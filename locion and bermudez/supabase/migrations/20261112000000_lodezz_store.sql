-- Lodezz.x store schema for Supabase (PostgreSQL).
-- Apply through Supabase CLI migrations or the Supabase SQL Editor.
-- The website currently uses browser storage; this migration creates the
-- database structure but does not connect the frontend to Supabase.
-- Use Supabase Auth for credentials and sessions. Never store plaintext passwords.

create extension if not exists pgcrypto;

create type public.account_status as enum ('active','suspended','pending_deletion');
create type public.app_role as enum ('customer','admin');
create type public.payment_method as enum ('gcash','maya','bank','card','qr');
create type public.order_status as enum ('processing','delivered','cancelled','payment_review','refunded');
create type public.item_fulfillment_status as enum ('pending','processing','delivered','failed','cancelled');
create type public.payment_status as enum ('pending','verified','failed','refunded');

-- Auth identity/password/session management belongs to Supabase Auth. This table
-- stores only the app's profile and authorization role. Clients must not be able
-- to change their own role; assign admin via trusted server/service-role SQL.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  username text unique,
  display_name text not null,
  role public.app_role not null default 'customer',
  status public.account_status not null default 'active',
  default_payment_method public.payment_method,
  password_change_required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz,
  deleted_at timestamptz,
  constraint profile_identifier_present check (email is not null or username is not null)
);

create table public.login_events (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete set null,
  identifier_entered text not null,
  event_type text not null check (event_type in ('login_success','login_failure','logout','account_locked','password_changed','password_reset')),
  occurred_at timestamptz not null default now(),
  ip_address inet,
  user_agent text,
  failure_reason text
);
create index login_events_user_time_idx on public.login_events(user_id, occurred_at desc);
create index login_events_identifier_time_idx on public.login_events(identifier_entered, occurred_at desc);

create table public.games (
  id text primary key,
  name text not null unique,
  currency_name text not null,
  requires_server boolean not null default false,
  active boolean not null default true,
  display_order integer not null default 0
);

create table public.user_game_preferences (
  user_id uuid not null references public.profiles(id) on delete cascade,
  game_id text not null references public.games(id) on delete cascade,
  liked_at timestamptz not null default now(),
  primary key(user_id, game_id)
);

create table public.saved_player_ids (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  game_id text not null references public.games(id) on delete cascade,
  label text,
  player_id text not null,
  server_id text,
  created_at timestamptz not null default now()
);
create index saved_player_ids_user_game_idx on public.saved_player_ids(user_id, game_id);

create table public.packages (
  id text primary key,
  game_id text not null references public.games(id),
  amount_label text not null,
  currency_name text not null,
  price_php numeric(12,2) not null check(price_php >= 0),
  original_price_php numeric(12,2) check(original_price_php is null or original_price_php >= price_php),
  bonus_amount integer not null default 0 check(bonus_amount >= 0),
  tag text,
  stock_status text not null default 'in' check(stock_status in ('in','low','out')),
  flash_price_php numeric(12,2) check(flash_price_php is null or flash_price_php >= 0),
  flash_ends_at timestamptz,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index packages_game_visible_idx on public.packages(game_id, is_visible);

create table public.promo_codes (
  id bigint generated always as identity primary key,
  code text not null unique check(code = upper(code)),
  discount_percent numeric(5,2) not null check(discount_percent > 0 and discount_percent <= 90),
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions integer check(max_redemptions is null or max_redemptions >= 0),
  per_user_limit integer check(per_user_limit is null or per_user_limit >= 0),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.carts (
  id bigint generated always as identity primary key,
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  promo_id bigint references public.promo_codes(id) on delete set null,
  updated_at timestamptz not null default now()
);
create table public.cart_items (
  id bigint generated always as identity primary key,
  cart_id bigint not null references public.carts(id) on delete cascade,
  package_id text not null references public.packages(id),
  quantity smallint not null check(quantity between 1 and 99),
  player_id text not null,
  server_id text
);
create index cart_items_cart_idx on public.cart_items(cart_id);

create table public.orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  user_id uuid not null references public.profiles(id),
  status public.order_status not null default 'processing',
  payment_method public.payment_method not null,
  currency char(3) not null default 'PHP',
  subtotal_php numeric(12,2) not null check(subtotal_php >= 0),
  discount_php numeric(12,2) not null default 0 check(discount_php >= 0),
  service_fee_php numeric(12,2) not null default 0 check(service_fee_php >= 0),
  total_php numeric(12,2) not null check(total_php >= 0),
  promo_id bigint references public.promo_codes(id) on delete set null,
  promo_code_snapshot text,
  payment_reference text,
  payer_masked text,
  customer_note text,
  placed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  cancelled_at timestamptz,
  delivered_at timestamptz
);
create index orders_user_date_idx on public.orders(user_id, placed_at desc);
create index orders_status_date_idx on public.orders(status, placed_at desc);

create table public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  package_id text references public.packages(id) on delete set null,
  game_id text references public.games(id) on delete set null,
  game_name_snapshot text not null,
  package_name_snapshot text not null,
  currency_snapshot text not null,
  unit_price_php numeric(12,2) not null check(unit_price_php >= 0),
  quantity smallint not null check(quantity between 1 and 99),
  bonus_amount integer not null default 0 check(bonus_amount >= 0),
  player_id text not null,
  server_id text,
  fulfillment_status public.item_fulfillment_status not null default 'pending',
  fulfilled_at timestamptz
);
create index order_items_order_idx on public.order_items(order_id);

-- Current demo checkout does not process payments. These are payment attempts /
-- references only. Never store card number, CVV, wallet password, or PIN here.
create table public.payment_records (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  provider text not null check(provider in ('gcash','maya','bank','card','qr','manual')),
  provider_transaction_id text,
  reference_submitted text,
  amount_php numeric(12,2) not null check(amount_php >= 0),
  status public.payment_status not null default 'pending',
  provider_payload jsonb,
  created_at timestamptz not null default now(),
  verified_at timestamptz,
  unique(provider, provider_transaction_id)
);

create table public.order_status_history (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  changed_by uuid references public.profiles(id) on delete set null,
  old_status public.order_status,
  new_status public.order_status not null,
  note text,
  changed_at timestamptz not null default now()
);
create index order_status_history_order_idx on public.order_status_history(order_id, changed_at desc);

create table public.promo_redemptions (
  id bigint generated always as identity primary key,
  promo_id bigint not null references public.promo_codes(id),
  user_id uuid not null references public.profiles(id),
  order_id bigint not null unique references public.orders(id) on delete cascade,
  redeemed_at timestamptz not null default now()
);
create index promo_redemptions_user_idx on public.promo_redemptions(promo_id, user_id);

create table public.admin_audit_log (
  id bigint generated always as identity primary key,
  admin_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb,
  occurred_at timestamptz not null default now()
);
create index admin_audit_admin_time_idx on public.admin_audit_log(admin_user_id, occurred_at desc);
create index admin_audit_entity_idx on public.admin_audit_log(entity_type, entity_id, occurred_at desc);

create table public.site_settings (
  setting_key text primary key,
  setting_value jsonb not null,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

insert into public.games(id,name,currency_name,requires_server,display_order) values
 ('roblox','Roblox','Robux',false,1),
 ('ml','Mobile Legends','Diamonds',true,2),
 ('valorant','Valorant','Valorant Points',false,3),
 ('genshin','Genshin Impact','Genesis Crystals',true,4)
on conflict(id) do update set name=excluded.name,currency_name=excluded.currency_name,
 requires_server=excluded.requires_server,display_order=excluded.display_order;

insert into public.site_settings(setting_key,setting_value) values
 ('checkout','{"service_fee_percent":0,"processing_seconds":45}'::jsonb),
 ('announcement','{"active":false,"text":""}'::jsonb)
on conflict(setting_key) do nothing;

-- Enable RLS on every exposed table. Add explicit policies after implementing
-- the backend. Default-deny is intentional; never expose admin tables broadly.
alter table public.profiles enable row level security;
alter table public.login_events enable row level security;
alter table public.games enable row level security;
alter table public.user_game_preferences enable row level security;
alter table public.saved_player_ids enable row level security;
alter table public.packages enable row level security;
alter table public.promo_codes enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payment_records enable row level security;
alter table public.order_status_history enable row level security;
alter table public.promo_redemptions enable row level security;
alter table public.admin_audit_log enable row level security;
alter table public.site_settings enable row level security;

-- App integration notes:
-- 1. Use Supabase Auth signup/signin; create profiles through a trusted trigger or
--    server function. Promote admins only from a trusted SQL/service role.
-- 2. Configure narrow RLS policies for customer-owned rows and admin-only access
--    before granting client access. Never put service_role keys in browser code.
-- 3. Perform checkout as a server-side Postgres function/Edge Function transaction:
--    validate live price, promo and stock; create order, items and payment record;
--    write status history. Confirm gateway payments only through verified webhooks.
