-- Run this in the Supabase SQL Editor after 0001_posts.sql.
-- Removes the slug column — posts are now looked up by their id instead,
-- so there's no separate URL field to fill in when writing a post.

alter table public.posts drop column if exists slug;
