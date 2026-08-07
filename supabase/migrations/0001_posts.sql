-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).
-- Creates the posts table and locks it down so:
--   - anyone (logged in or not) can read published posts
--   - only the signed-in author can create/edit/delete their own posts

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (
    category in (
      'Public Policy',
      'Governance',
      'Education',
      'Society',
      'International Relations',
      'Environment',
      'Technology Policy'
    )
  ),
  cover_url text,
  reading_time text not null default '1 min read',
  content text not null,
  featured boolean not null default false,
  published boolean not null default true,
  author_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_created_at_idx
  on public.posts (published, created_at desc);

alter table public.posts enable row level security;

drop policy if exists "Anyone can read published posts" on public.posts;
create policy "Anyone can read published posts"
  on public.posts for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Author can read all own posts" on public.posts;
create policy "Author can read all own posts"
  on public.posts for select
  to authenticated
  using (auth.uid() = author_id);

drop policy if exists "Author can insert own posts" on public.posts;
create policy "Author can insert own posts"
  on public.posts for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Author can update own posts" on public.posts;
create policy "Author can update own posts"
  on public.posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "Author can delete own posts" on public.posts;
create policy "Author can delete own posts"
  on public.posts for delete
  to authenticated
  using (auth.uid() = author_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();
