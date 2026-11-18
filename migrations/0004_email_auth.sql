create table if not exists email_challenges (
  email text primary key,
  code_hash text not null,
  attempts int not null default 0,
  sent_at timestamptz not null default now(),
  expires_at timestamptz not null,
  proof_hash text,
  proof_until timestamptz
);

alter table profiles add column if not exists email_verified boolean not null default false;
