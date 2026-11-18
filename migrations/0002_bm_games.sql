create table if not exists bm_games (
  code text primary key,
  host_token text not null,
  rev integer not null default 1,
  state jsonb not null,
  updated_at timestamptz not null default now()
);
