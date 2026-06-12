-- ─────────────────────────────────────────────────────────────────────────────
-- WagSpeed — Contact messages table
-- Run this in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          BIGSERIAL    PRIMARY KEY,
  name        TEXT         NOT NULL,
  email       TEXT         NOT NULL,
  phone       TEXT,
  message     TEXT         NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Index for admin sorting by most recent
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON public.contact_messages (created_at DESC);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS entirely — all writes go through the API route
-- No public read or write access
