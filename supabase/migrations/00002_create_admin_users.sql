-- Create admin role enum
CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'volunteer_lead', 'checkin');

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT,
  role admin_role NOT NULL DEFAULT 'admin',
  mfa_secret TEXT,
  mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  invite_token TEXT UNIQUE,
  invite_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Index for email lookups (login)
CREATE INDEX idx_admin_users_email ON admin_users (email);

-- Index for invite token lookups (partial - only non-null tokens)
CREATE INDEX idx_admin_users_invite_token ON admin_users (invite_token) WHERE invite_token IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only service role can access admin_users (no direct client access)
CREATE POLICY "Service role only" ON admin_users
  FOR ALL
  USING (auth.role() = 'service_role');
