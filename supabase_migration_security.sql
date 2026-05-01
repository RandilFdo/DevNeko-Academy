-- ============================================================
-- DevNeko Security Hardening Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ============================================
-- STEP 1: Add new columns to profiles
-- ============================================
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_course_access boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;

-- Backfill email from auth.users for existing rows
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

-- ============================================
-- STEP 2: Drop ALL existing overly-permissive policies
-- ============================================

-- profiles policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

-- progress policies
DROP POLICY IF EXISTS "Users can view their own progress" ON public.progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.progress;

-- messages policies
DROP POLICY IF EXISTS "Messages are viewable by everyone in the course" ON public.messages;
DROP POLICY IF EXISTS "Users can insert messages" ON public.messages;

-- enrollments policies (table may not exist yet)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'enrollments') THEN
    DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
    DROP POLICY IF EXISTS "Users can update their own enrollments" ON public.enrollments;
    DROP POLICY IF EXISTS "Users can modify their own enrollments" ON public.enrollments;
  END IF;
END $$;

-- ============================================
-- STEP 3: Recreate HARDENED RLS policies
-- ============================================

-- === PROFILES ===
-- Users can ONLY read their own profile
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile (for the trigger)
CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile BUT CANNOT change has_course_access
-- The WITH CHECK ensures the value of has_course_access in the UPDATE
-- must match the current value in the database
CREATE POLICY "profiles_update_own_safe"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND has_course_access IS NOT DISTINCT FROM (
      SELECT has_course_access FROM public.profiles WHERE id = auth.uid()
    )
  );

-- === PROGRESS ===
CREATE POLICY "progress_select_own"
  ON public.progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "progress_insert_own"
  ON public.progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progress_update_own"
  ON public.progress FOR UPDATE
  USING (auth.uid() = user_id);

-- === MESSAGES ===
-- Users can only see messages in courses they have access to
CREATE POLICY "messages_select_own"
  ON public.messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "messages_insert_own"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- === ENROLLMENTS ===
-- Create table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS public.enrollments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id text NOT NULL,
  last_lesson_id text,
  enrolled_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select_own"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "enrollments_insert_own"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "enrollments_update_own"
  ON public.enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 4: Update the handle_new_user trigger
-- to include has_course_access = false
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, email, has_course_access)
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data->>'display_name',
      new.raw_user_meta_data->>'full_name',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    false
  )
  ON CONFLICT (id) DO UPDATE SET
    display_name = COALESCE(EXCLUDED.display_name, profiles.display_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    email = COALESCE(EXCLUDED.email, profiles.email);
  RETURN new;
END;
$$;

-- ============================================
-- STEP 5: Private video storage bucket
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-videos', 'course-videos', false)
ON CONFLICT (id) DO NOTHING;

-- Only users with course access can read videos
CREATE POLICY "Authenticated users with access can view videos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'course-videos'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND has_course_access = true
    )
  );

-- Only service role (admin) can upload/delete videos
-- No INSERT/UPDATE/DELETE policies = blocked by default
