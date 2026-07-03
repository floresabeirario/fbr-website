-- db/analytics.sql
-- ============================================================
-- Tabelas para os dados de analytics do site (Microsoft Clarity).
-- Correr UMA vez no SQL Editor do Supabase (projeto do site).
--
--   analytics_snapshots — dados crus, um a cada ~3 dias. Auto-limpam-se
--                         (a rota de cron apaga os que têm mais de 45 dias),
--                         por isso nunca crescem: rondam sempre ~15 linhas.
--   analytics_monthly   — resumo compilado, 1 linha por mês. Permanente e
--                         minúsculo; é o que serve para comparar ano a ano.
--
-- Só o service_role (o servidor) acede. RLS ligado sem policies públicas,
-- portanto ninguém consegue ler estes dados com a anon key. [[feedback_supabase_rls_pitfalls]]
-- ============================================================

create table if not exists public.analytics_snapshots (
  id          uuid primary key default gen_random_uuid(),
  source      text not null default 'clarity',
  captured_at timestamptz not null default now(),
  period_days integer not null default 3,
  data        jsonb not null
);

create index if not exists analytics_snapshots_captured_at_idx
  on public.analytics_snapshots (captured_at);

create table if not exists public.analytics_monthly (
  month       date not null,          -- primeiro dia do mês (ex.: 2026-07-01)
  source      text not null default 'clarity',
  summary     jsonb not null,
  compiled_at timestamptz not null default now(),
  primary key (month, source)
);

alter table public.analytics_snapshots enable row level security;
alter table public.analytics_monthly   enable row level security;

grant all on table public.analytics_snapshots to service_role;
grant all on table public.analytics_monthly   to service_role;
