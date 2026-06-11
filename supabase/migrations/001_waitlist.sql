-- ─────────────────────────────────────────────────────────────────────────────
-- WagSpeed — Waitlist table
-- Run this in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.waitlist (
  id          BIGSERIAL    PRIMARY KEY,
  name        TEXT,
  email       TEXT         NOT NULL,
  phone       TEXT,
  dog_count   TEXT,
  city        TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Unique email constraint — surfaces as Postgres error code 23505 in the API
ALTER TABLE public.waitlist
  ADD CONSTRAINT waitlist_email_unique UNIQUE (email);

-- Fast descending index for count queries and admin sorting
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx
  ON public.waitlist (created_at DESC);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS entirely — all server-side writes use service role key
-- Anon / public users have zero direct table access; all writes go through the API route

-- ─── Already ran 001 without name/phone? Run this instead ────────────────────
-- ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS name  TEXT;
-- ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS phone TEXT;
