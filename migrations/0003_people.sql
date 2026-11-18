create table if not exists profiles (
  id text primary key,
  username text not null unique,
  pin_hash text not null,
  first_name text not null,
  last_name text not null,
  city text not null default '',
  state text not null default '',
  email text not null default '',
  phone text not null default '',
  avatar text not null default '',
  background jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profile_sessions (
  token_hash text primary key,
  profile_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists friendships (
  id text primary key,
  from_id text not null,
  to_id text not null,
  status text not null,
  created_at timestamptz not null default now(),
  unique (from_id, to_id)
);

create table if not exists messages (
  id text primary key,
  from_id text not null,
  to_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_pair on messages (from_id, to_id, created_at);
