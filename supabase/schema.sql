-- ============================================================
-- Dynamic Portfolio — Supabase schema
-- Run this in your Supabase project: SQL Editor -> New query
-- ============================================================

-- PROJECTS
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  description text,
  tech_stack text[] default '{}',
  cover_image_url text,
  live_url text,
  repo_url text,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- POSTS (blog)
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text, -- HTML from the rich text editor
  cover_image_url text,
  tags text[] default '{}',
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SITE SETTINGS (single row)
create table if not exists site_settings (
  id int primary key default 1,
  name text default 'Your Name',
  tagline text default 'Developer',
  bio text default '',
  avatar_url text,
  resume_url text,
  email text,
  github_url text,
  linkedin_url text,
  twitter_url text,
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated on projects;
create trigger trg_projects_updated before update on projects
  for each row execute procedure set_updated_at();

drop trigger if exists trg_posts_updated on posts;
create trigger trg_posts_updated before update on posts
  for each row execute procedure set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- Public can READ published/all rows as appropriate.
-- Only authenticated users (you + collaborators you invite via
-- Supabase Auth) can INSERT/UPDATE/DELETE.
-- ============================================================

alter table projects enable row level security;
alter table posts enable row level security;
alter table site_settings enable row level security;

-- Public read access
create policy "Public can read projects" on projects
  for select using (true);

create policy "Public can read published posts" on posts
  for select using (published = true);

create policy "Authenticated can read all posts" on posts
  for select using (auth.role() = 'authenticated');

create policy "Public can read site settings" on site_settings
  for select using (true);

-- Authenticated write access (admin panel)
create policy "Authenticated can insert projects" on projects
  for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update projects" on projects
  for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete projects" on projects
  for delete using (auth.role() = 'authenticated');

create policy "Authenticated can insert posts" on posts
  for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update posts" on posts
  for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete posts" on posts
  for delete using (auth.role() = 'authenticated');

create policy "Authenticated can update settings" on site_settings
  for update using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE (run after creating a public bucket named "media"
-- in Supabase Dashboard -> Storage -> New bucket -> Public)
-- ============================================================
-- These policies assume a bucket called "media".
create policy "Public can view media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Authenticated can upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Authenticated can delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
