alter table profiles add column if not exists rank text not null default 'player';

create table if not exists staff (
  token_hash text primary key,
  rank text not null
);
