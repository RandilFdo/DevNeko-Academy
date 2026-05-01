-- ============================================
-- Student ID Generation Logic
-- Run this in the Supabase SQL Editor
-- ============================================

-- Function to generate a random 5-digit student ID suffix
CREATE OR REPLACE FUNCTION public.generate_student_id()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  new_id text;
  id_exists boolean;
BEGIN
  LOOP
    -- Format: DVNK + 5 random digits
    new_id := 'DVNK' || floor(random() * 90000 + 10000)::text;
    
    -- Check for collisions
    SELECT EXISTS (SELECT 1 FROM public.profiles WHERE student_id = new_id) INTO id_exists;
    
    EXIT WHEN NOT id_exists;
  END LOOP;
  
  RETURN new_id;
END;
$$;

-- Trigger function to assign student_id when access is granted
CREATE OR REPLACE FUNCTION public.assign_student_id_on_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If has_course_access changed from false to true AND student_id is null
  IF (NEW.has_course_access = true AND (OLD.has_course_access = false OR OLD.has_course_access IS NULL) AND NEW.student_id IS NULL) THEN
    NEW.student_id := public.generate_student_id();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_access_granted_assign_student_id ON public.profiles;

CREATE TRIGGER on_access_granted_assign_student_id
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.assign_student_id_on_access();
