-- Checklist for the threaded comment upgrade:
-- [ ] Add an `email` column to store commenter emails privately.
-- [ ] Add a `parent_id` column (uuid, nullable) that references `comments.id`.
-- [ ] Add an `is_owner` column (boolean, default false) for verified author replies.
-- [ ] If your table was created without `id uuid primary key`, add it first because replies require a stable parent reference.
-- [ ] Ensure `created_at timestamptz default timezone('utc', now())` exists for chronological threading.
--
-- Suggested migration snippets:
-- alter table public.comments add column if not exists email text;
-- alter table public.comments add column if not exists parent_id uuid references public.comments(id) on delete cascade;
-- alter table public.comments add column if not exists is_owner boolean not null default false;

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  slug text not null,
  name text not null check (char_length(name) between 1 and 80),
  content text not null check (char_length(content) between 1 and 2000),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.comments
  add column if not exists slug text,
  add column if not exists name text,
  add column if not exists content text,
  add column if not exists created_at timestamptz not null default timezone('utc', now());

create index if not exists comments_slug_created_at_idx
  on public.comments (slug, created_at desc);

alter table public.comments enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert on table public.comments to anon, authenticated;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'comments'
      and column_name = 'id'
  ) then
    grant usage, select on sequence public.comments_id_seq to anon, authenticated;
  end if;
end
$$;

drop policy if exists "Allow public comment reads" on public.comments;
drop policy if exists "Allow public comment inserts" on public.comments;
drop policy if exists "Public can read comments" on public.comments;
drop policy if exists "Public can insert comments" on public.comments;

create policy "Public can read comments"
  on public.comments
  for select
  to anon, authenticated
  using (true);

create policy "Public can insert comments"
  on public.comments
  for insert
  to anon, authenticated
  with check (true);
