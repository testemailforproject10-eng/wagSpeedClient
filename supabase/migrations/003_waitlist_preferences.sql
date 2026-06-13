-- ─────────────────────────────────────────────────────────────────────────────
-- WagSpeed — Waitlist scheduling preferences
-- Adds the preferred_day / preferred_time columns the waitlist form collects.
-- These were added to the app code after 001 but never migrated, which is why
-- inserts fail with PGRST204 ("Could not find the 'preferred_day' column").
-- Run this in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS preferred_day  TEXT,
  ADD COLUMN IF NOT EXISTS preferred_time TEXT;

-- Force PostgREST to refresh its schema cache so the new columns are usable
-- immediately (otherwise the API may keep returning PGRST204 for a short while).
NOTIFY pgrst, 'reload schema';
