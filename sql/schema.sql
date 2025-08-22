-- SQL schema for Find Your Fit
-- Supabase Postgres

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  bio text,
  role text default 'mentee',
  can_mentor boolean default false,
  gender text check (gender in ('male','female','other')),
  education text,
  profession text,
  experience_years int,
  location_city text,
  created_at timestamptz default now()
);

create table if not exists skills (
  id bigserial primary key,
  name text unique not null
);

create table if not exists profile_skills (
  profile_id uuid references profiles(id) on delete cascade,
  skill_id bigint references skills(id) on delete cascade,
  primary key(profile_id, skill_id)
);

create table if not exists mentor_applications (
  id bigserial primary key,
  applicant_id uuid references profiles(id) on delete cascade,
  headline text,
  domains text[],
  education text,
  experience_years int,
  portfolio_url text,
  linkedin_url text,
  hourly_rate numeric(10,2) default 0,
  status text check (status in ('pending','approved','rejected')) default 'pending',
  review_notes text,
  submitted_at timestamptz default now(),
  reviewed_at timestamptz
);

create table if not exists connections (
  id bigserial primary key,
  mentor_id uuid references profiles(id),
  mentee_id uuid references profiles(id),
  status text check (status in ('requested','accepted','declined','ended')) default 'requested',
  created_at timestamptz default now()
);

create table if not exists reviews (
  id bigserial primary key,
  connection_id bigint references connections(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_profiles_city on profiles(location_city);
create index if not exists idx_profiles_profession on profiles(profession);
create index if not exists idx_profiles_experience on profiles(experience_years);

-- RLS (simplified)
alter table profiles enable row level security;
create policy "Public read profiles" on profiles for select using (true);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);

alter table mentor_applications enable row level security;
create policy "Owner can insert/read" on mentor_applications for all using (auth.uid() = applicant_id) with check (auth.uid() = applicant_id);

alter table connections enable row level security;
create policy "Participants can select" on connections for select using (auth.uid() in (mentor_id, mentee_id));
