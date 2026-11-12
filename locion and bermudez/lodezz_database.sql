-- Lodezz.x game top-up store database
-- Target: MySQL 8.0+ / InnoDB / utf8mb4
-- This is a backend schema for replacing the website's browser-only demo storage.
-- Do not insert plaintext passwords or real payment credentials into this database.

CREATE DATABASE IF NOT EXISTS lodezz_store
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE lodezz_store;

-- Accounts. Store only an adaptive hash created by the application (Argon2id or
-- bcrypt); never store plaintext passwords or use the demo SHA-256 browser hash.
CREATE TABLE users (
  user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(254) NULL,
  username VARCHAR(30) NULL,
  display_name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('customer','admin') NOT NULL DEFAULT 'customer',
  account_status ENUM('active','suspended','pending_deletion') NOT NULL DEFAULT 'active',
  default_payment_method ENUM('gcash','maya','bank','card','qr') NULL,
  password_change_required BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  last_login_at DATETIME(3) NULL,
  deleted_at DATETIME(3) NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_username (username),
  KEY ix_users_status_role (account_status, role),
  CONSTRAINT ck_users_contact CHECK (email IS NOT NULL OR username IS NOT NULL)
) ENGINE=InnoDB;

-- Authentication records support sign-in history, lockouts and session revocation.
-- Keep only a hash of the opaque session token; the raw token belongs to the client.
CREATE TABLE login_events (
  login_event_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NULL,
  identifier_entered VARCHAR(254) NOT NULL,
  event_type ENUM('login_success','login_failure','logout','account_locked','password_changed','password_reset') NOT NULL,
  occurred_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  ip_address VARBINARY(16) NULL,
  user_agent VARCHAR(512) NULL,
  failure_reason VARCHAR(80) NULL,
  PRIMARY KEY (login_event_id),
  KEY ix_login_user_time (user_id, occurred_at),
  KEY ix_login_identifier_time (identifier_entered, occurred_at),
  CONSTRAINT fk_login_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE auth_sessions (
  session_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash BINARY(32) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  expires_at DATETIME(3) NOT NULL,
  last_seen_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  revoked_at DATETIME(3) NULL,
  remember_me BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (session_id),
  UNIQUE KEY uq_session_token_hash (token_hash),
  KEY ix_session_user_active (user_id, revoked_at, expires_at),
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE login_throttles (
  identifier_key BINARY(32) NOT NULL,
  failed_count SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  window_started_at DATETIME(3) NOT NULL,
  locked_until DATETIME(3) NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (identifier_key)
) ENGINE=InnoDB;

-- Customer preferences and remembered game IDs are normalized instead of stored
-- as an unvalidated JSON blob. Keep player IDs private and restrict staff access.
CREATE TABLE games (
  game_id VARCHAR(40) NOT NULL,
  name VARCHAR(100) NOT NULL,
  currency_name VARCHAR(80) NOT NULL,
  requires_server BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (game_id), UNIQUE KEY uq_games_name (name)
) ENGINE=InnoDB;

CREATE TABLE user_game_preferences (
  user_id BIGINT UNSIGNED NOT NULL,
  game_id VARCHAR(40) NOT NULL,
  liked_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (user_id, game_id),
  CONSTRAINT fk_preference_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_preference_game FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE saved_player_ids (
  saved_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  game_id VARCHAR(40) NOT NULL,
  label VARCHAR(80) NULL,
  player_id VARCHAR(120) NOT NULL,
  server_id VARCHAR(80) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (saved_id),
  KEY ix_saved_player_user_game (user_id, game_id),
  CONSTRAINT fk_saved_player_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_player_game FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Product catalog and admin-managed package prices/stock/visibility.
CREATE TABLE packages (
  package_id VARCHAR(64) NOT NULL,
  game_id VARCHAR(40) NOT NULL,
  amount_label VARCHAR(100) NOT NULL,
  currency_name VARCHAR(80) NOT NULL,
  price_php DECIMAL(12,2) NOT NULL,
  original_price_php DECIMAL(12,2) NULL,
  bonus_amount INT UNSIGNED NOT NULL DEFAULT 0,
  tag VARCHAR(30) NULL,
  stock_status ENUM('in','low','out') NOT NULL DEFAULT 'in',
  flash_price_php DECIMAL(12,2) NULL,
  flash_ends_at DATETIME(3) NULL,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (package_id),
  KEY ix_packages_game_visible (game_id, is_visible),
  CONSTRAINT fk_package_game FOREIGN KEY (game_id) REFERENCES games(game_id),
  CONSTRAINT ck_package_price CHECK (price_php >= 0),
  CONSTRAINT ck_package_original_price CHECK (original_price_php IS NULL OR original_price_php >= price_php),
  CONSTRAINT ck_package_flash_price CHECK (flash_price_php IS NULL OR flash_price_php >= 0)
) ENGINE=InnoDB;

CREATE TABLE promo_codes (
  promo_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(20) NOT NULL,
  discount_percent DECIMAL(5,2) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  starts_at DATETIME(3) NULL,
  ends_at DATETIME(3) NULL,
  max_redemptions INT UNSIGNED NULL,
  per_user_limit INT UNSIGNED NULL,
  created_by BIGINT UNSIGNED NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (promo_id), UNIQUE KEY uq_promo_code (code),
  CONSTRAINT fk_promo_creator FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT ck_promo_discount CHECK (discount_percent > 0 AND discount_percent <= 90)
) ENGINE=InnoDB;

-- Carts are persisted per customer; order lines capture immutable price/name
-- snapshots so later catalog changes never alter historical receipts.
CREATE TABLE carts (
  cart_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  promo_id BIGINT UNSIGNED NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (cart_id), UNIQUE KEY uq_cart_user (user_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_promo FOREIGN KEY (promo_id) REFERENCES promo_codes(promo_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE cart_items (
  cart_item_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cart_id BIGINT UNSIGNED NOT NULL,
  package_id VARCHAR(64) NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  player_id VARCHAR(120) NOT NULL,
  server_id VARCHAR(80) NULL,
  PRIMARY KEY (cart_item_id), UNIQUE KEY uq_cart_package_player (cart_id, package_id, player_id, server_id),
  CONSTRAINT fk_cart_item_cart FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_item_package FOREIGN KEY (package_id) REFERENCES packages(package_id),
  CONSTRAINT ck_cart_quantity CHECK (quantity BETWEEN 1 AND 99)
) ENGINE=InnoDB;

CREATE TABLE orders (
  order_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_number VARCHAR(32) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  status ENUM('processing','delivered','cancelled','payment_review','refunded') NOT NULL DEFAULT 'processing',
  payment_method ENUM('gcash','maya','bank','card','qr') NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'PHP',
  subtotal_php DECIMAL(12,2) NOT NULL,
  discount_php DECIMAL(12,2) NOT NULL DEFAULT 0,
  service_fee_php DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_php DECIMAL(12,2) NOT NULL,
  promo_id BIGINT UNSIGNED NULL,
  promo_code_snapshot VARCHAR(20) NULL,
  payment_reference VARCHAR(120) NULL,
  payer_masked VARCHAR(32) NULL,
  customer_note VARCHAR(500) NULL,
  placed_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  cancelled_at DATETIME(3) NULL,
  delivered_at DATETIME(3) NULL,
  PRIMARY KEY (order_id), UNIQUE KEY uq_order_number (order_number),
  KEY ix_orders_user_date (user_id, placed_at),
  KEY ix_orders_status_date (status, placed_at),
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_order_promo FOREIGN KEY (promo_id) REFERENCES promo_codes(promo_id) ON DELETE SET NULL,
  CONSTRAINT ck_order_amounts CHECK (subtotal_php >= 0 AND discount_php >= 0 AND service_fee_php >= 0 AND total_php >= 0)
) ENGINE=InnoDB;

CREATE TABLE order_items (
  order_item_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  package_id VARCHAR(64) NULL,
  game_id VARCHAR(40) NULL,
  game_name_snapshot VARCHAR(100) NOT NULL,
  package_name_snapshot VARCHAR(100) NOT NULL,
  currency_snapshot VARCHAR(80) NOT NULL,
  unit_price_php DECIMAL(12,2) NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  bonus_amount INT UNSIGNED NOT NULL DEFAULT 0,
  player_id VARCHAR(120) NOT NULL,
  server_id VARCHAR(80) NULL,
  fulfillment_status ENUM('pending','processing','delivered','failed','cancelled') NOT NULL DEFAULT 'pending',
  fulfilled_at DATETIME(3) NULL,
  PRIMARY KEY (order_item_id), KEY ix_order_items_order (order_id),
  CONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT fk_item_package FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE SET NULL,
  CONSTRAINT fk_item_game FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE SET NULL,
  CONSTRAINT ck_order_item_values CHECK (unit_price_php >= 0 AND quantity BETWEEN 1 AND 99)
) ENGINE=InnoDB;

-- The current website does not connect to a payment gateway. These rows record
-- submitted payment instructions/references only. A real integration must use
-- provider tokens and verified webhooks; never store card numbers or CVV.
CREATE TABLE payment_records (
  payment_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  provider ENUM('gcash','maya','bank','card','qr','manual') NOT NULL,
  provider_transaction_id VARCHAR(160) NULL,
  reference_submitted VARCHAR(120) NULL,
  amount_php DECIMAL(12,2) NOT NULL,
  status ENUM('pending','verified','failed','refunded') NOT NULL DEFAULT 'pending',
  provider_payload JSON NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  verified_at DATETIME(3) NULL,
  PRIMARY KEY (payment_id), KEY ix_payment_order (order_id),
  UNIQUE KEY uq_provider_transaction (provider, provider_transaction_id),
  CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT ck_payment_amount CHECK (amount_php >= 0)
) ENGINE=InnoDB;

CREATE TABLE order_status_history (
  status_history_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  changed_by BIGINT UNSIGNED NULL,
  old_status ENUM('processing','delivered','cancelled','payment_review','refunded') NULL,
  new_status ENUM('processing','delivered','cancelled','payment_review','refunded') NOT NULL,
  note VARCHAR(500) NULL,
  changed_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (status_history_id), KEY ix_order_history (order_id, changed_at),
  CONSTRAINT fk_history_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT fk_history_actor FOREIGN KEY (changed_by) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE promo_redemptions (
  redemption_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  promo_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  order_id BIGINT UNSIGNED NOT NULL,
  redeemed_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (redemption_id), UNIQUE KEY uq_promo_order (order_id),
  KEY ix_promo_user (promo_id, user_id),
  CONSTRAINT fk_redemption_promo FOREIGN KEY (promo_id) REFERENCES promo_codes(promo_id),
  CONSTRAINT fk_redemption_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_redemption_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Records admin actions for price, customer, order, promo and site changes.
CREATE TABLE admin_audit_log (
  audit_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  admin_user_id BIGINT UNSIGNED NULL,
  action VARCHAR(80) NOT NULL,
  entity_type VARCHAR(40) NOT NULL,
  entity_id VARCHAR(100) NULL,
  details JSON NULL,
  occurred_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (audit_id), KEY ix_audit_admin_time (admin_user_id, occurred_at),
  KEY ix_audit_entity (entity_type, entity_id, occurred_at),
  CONSTRAINT fk_audit_admin FOREIGN KEY (admin_user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE site_settings (
  setting_key VARCHAR(80) NOT NULL,
  setting_value JSON NOT NULL,
  updated_by BIGINT UNSIGNED NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (setting_key),
  CONSTRAINT fk_setting_actor FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Seed public catalog labels. Package prices can be imported from data.js or
-- edited in the admin interface; no demo customer/admin credentials are seeded.
INSERT INTO games (game_id, name, currency_name, requires_server, display_order) VALUES
 ('roblox','Roblox','Robux',FALSE,1),
 ('ml','Mobile Legends','Diamonds',TRUE,2),
 ('valorant','Valorant','Valorant Points',FALSE,3),
 ('genshin','Genshin Impact','Genesis Crystals',TRUE,4)
ON DUPLICATE KEY UPDATE name=VALUES(name), currency_name=VALUES(currency_name),
  requires_server=VALUES(requires_server), display_order=VALUES(display_order);

INSERT INTO site_settings (setting_key, setting_value) VALUES
 ('checkout', JSON_OBJECT('service_fee_percent',0,'processing_seconds',45)),
 ('announcement', JSON_OBJECT('active',FALSE,'text',''))
ON DUPLICATE KEY UPDATE setting_key=VALUES(setting_key);

-- Recommended transaction flow (implemented in the application, not this DDL):
-- 1. Register: validate unique email/username; hash password with Argon2id/bcrypt;
--    insert users(role='customer'); never accept a role from public registration.
-- 2. Login: look up normalized identifier; check account status and password hash;
--    throttle failures; insert login_events; create random opaque auth_sessions token.
--    Admin authorization must be checked server-side on every admin request.
-- 3. Checkout: begin transaction; re-read current package prices and stock; validate
--    promo and player IDs; insert orders, order_items, payment_records, status history;
--    commit. Gateway confirmation should update payment/order only after verified webhook.
-- 4. Admin edits: require admin role, update catalog/customer/order/settings, and insert
--    admin_audit_log in the same database transaction. Never expose password hashes.
