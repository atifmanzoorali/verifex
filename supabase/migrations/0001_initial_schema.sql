-- profiles: auto-created on user registration via trigger
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- trigger: create profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- api_keys
create table public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  key_hash text not null unique,
  key_prefix text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

alter table public.api_keys enable row level security;

create policy "Users can view own keys"
  on public.api_keys for select
  using (auth.uid() = user_id);

create policy "Users can insert own keys"
  on public.api_keys for insert
  with check (auth.uid() = user_id);

create policy "Users can update own keys"
  on public.api_keys for update
  using (auth.uid() = user_id);

-- usage_logs
create table public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  api_key_id uuid not null references public.api_keys on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  email_domain text not null,
  result text not null check (result in ('valid', 'invalid')),
  format_check boolean not null,
  mx_check boolean not null,
  duration_ms integer not null,
  created_at timestamptz not null default now()
);

alter table public.usage_logs enable row level security;

create policy "Users can view own logs"
  on public.usage_logs for select
  using (auth.uid() = user_id);

-- No insert policy needed. The validation Route Handler uses the service role client,
-- which bypasses RLS entirely. An open insert policy would let any authenticated user
-- forge logs for any user_id — so we intentionally omit it.
