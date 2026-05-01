-- User Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  display_name text,
  is_premium boolean default false,
  theme text default 'dark',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add fields to profiles
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists theme text default 'dark';
alter table public.profiles add column if not exists xp_points integer default 0;
alter table public.profiles add column if not exists rank_tier text default 'Spark';
alter table public.profiles add column if not exists student_id text;
alter table public.profiles add column if not exists access_expires_at timestamp with time zone;

-- Create enrollments table for tracking progress per course
create table if not exists public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id text not null,
  last_lesson_id text,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- Enable RLS on enrollments
alter table public.enrollments enable row level security;

create policy "Users can view their own enrollments"
  on public.enrollments for select
  using ( auth.uid() = user_id );

create policy "Users can update their own enrollments"
  on public.enrollments for insert
  with check ( auth.uid() = user_id );

create policy "Users can modify their own enrollments"
  on public.enrollments for update
  using ( auth.uid() = user_id );

-- STORAGE POLICIES for 'avatars' bucket
-- Note: You must create the 'avatars' bucket manually in the Supabase Dashboard first.
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

create policy "Users can update their own avatar"
  on storage.objects for update
  using ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

-- Course Progress
create table public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  module_id text not null,
  lesson_id text not null,
  completed boolean default false,
  completed_at timestamp with time zone,
  unique(user_id, lesson_id)
);

-- Live Chat Messages
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id text not null,
  text text not null,
  sender_type text not null check (sender_type in ('user', 'mentor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.messages enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Policies for progress
create policy "Users can view their own progress" on public.progress for select using (auth.uid() = user_id);
create policy "Users can insert their own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "Users can update their own progress" on public.progress for update using (auth.uid() = user_id);

-- Policies for messages
create policy "Messages are viewable by everyone in the course" on public.messages for select using (true);
create policy "Users can insert messages" on public.messages for insert with check (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id, 
    coalesce(
      new.raw_user_meta_data->>'display_name',
      new.raw_user_meta_data->>'full_name',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
