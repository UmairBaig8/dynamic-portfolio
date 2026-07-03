-- Add category column to projects
alter table projects add column if not exists category text;

-- Add publish_at column to posts
alter table posts add column if not exists publish_at timestamptz;
