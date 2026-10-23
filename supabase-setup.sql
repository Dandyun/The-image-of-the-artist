-- Run in your Supabase project's SQL editor.
-- The browser stores only a broad classification of the first impression,
-- never visitors' raw written answers, names, emails, or IP addresses.
-- CAUTION: anonymous insert endpoints still require monitoring for spam.

create table if not exists public.artist_survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_impression text not null check (first_impression = any (array[
    'Painter / painting', 'Artist / art', 'Designer / illustrator',
    'Other creative role', 'Other / unsure'
  ])),
  activities text[] not null check (
    cardinality(activities) between 1 and 8
    and activities <@ array[
      'Make images or objects', 'Express ideas or emotions',
      'Document people or places', 'Experiment with materials or technology',
      'Question conventions or society', 'Tell stories or preserve memory',
      'Teach or collaborate', 'Something else / not sure'
    ]::text[]
  ),
  visuals text[] not null check (
    cardinality(visuals) between 1 and 7
    and visuals <@ array[
      'Tools they use', 'Clothing or appearance', 'Body language or pose',
      'Studio or working environment', 'Act of making something',
      'Objects associated with art', 'None of these / not sure'
    ]::text[]
  )
);

alter table public.artist_survey_responses enable row level security;
revoke all on public.artist_survey_responses from anon, authenticated;
grant insert on public.artist_survey_responses to anon, authenticated;

-- Visitors can submit anonymous choices but cannot read other visitors' rows.
drop policy if exists "Visitors can submit anonymous choices" on public.artist_survey_responses;
create policy "Visitors can submit anonymous choices"
on public.artist_survey_responses for insert to anon, authenticated
with check (true);

-- Return aggregate counts only. SECURITY DEFINER bypasses table RLS;
-- it exposes aggregated data, not raw individual submissions.
create or replace function public.artist_survey_summary()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'total', (select count(*) from public.artist_survey_responses),
    'impressions', coalesce((
      select jsonb_object_agg(t.k, t.n) from (
        select first_impression as k, count(*) as n
        from public.artist_survey_responses group by first_impression
      ) as t
    ), '{}'::jsonb),
    'activities', coalesce((
      select jsonb_object_agg(t.k, t.n) from (
        select a as k, count(*) as n from public.artist_survey_responses r,
        lateral unnest(r.activities) as a group by a
      ) as t
    ), '{}'::jsonb),
    'visuals', coalesce((
      select jsonb_object_agg(t.k, t.n) from (
        select a as k, count(*) as n from public.artist_survey_responses r,
        lateral unnest(r.visuals) as a group by a
      ) as t
    ), '{}'::jsonb)
  );
$$;
revoke all on function public.artist_survey_summary() from public;
grant execute on function public.artist_survey_summary() to anon, authenticated;
