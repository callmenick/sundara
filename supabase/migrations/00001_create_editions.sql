-- Create edition status enum
CREATE TYPE edition_status AS ENUM ('upcoming', 'active', 'completed');

-- Create editions table
CREATE TABLE editions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  location TEXT,
  status edition_status NOT NULL DEFAULT 'upcoming',
  is_current BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only one current edition at a time (partial unique index)
CREATE UNIQUE INDEX idx_editions_current ON editions (is_current) WHERE is_current = TRUE;

-- Index for year lookups
CREATE INDEX idx_editions_year ON editions (year);

-- Seed 2026 edition
INSERT INTO editions (year, name, status, is_current)
VALUES (2026, 'Sundara 2026', 'upcoming', TRUE);
