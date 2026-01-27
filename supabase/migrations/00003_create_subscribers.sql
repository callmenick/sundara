CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL DEFAULT 'website',
  edition_id UUID REFERENCES editions(id),
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  resend_contact_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_subscribers_email ON subscribers (email);
CREATE INDEX idx_subscribers_active ON subscribers (subscribed_at)
  WHERE unsubscribed_at IS NULL;

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON subscribers
  FOR ALL USING (auth.role() = 'service_role');
