-- Migration: Convert client, duration, budget from plain text to JSONB TranslatedField
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- Step 1: Convert columns from text to jsonb, wrapping existing values in a TranslatedField structure
ALTER TABLE realisations
  ALTER COLUMN client TYPE jsonb USING
    CASE
      WHEN client IS NOT NULL THEN jsonb_build_object('fr', client, 'en', '', 'zh', '', 'ar', '')
      ELSE NULL
    END,
  ALTER COLUMN duration TYPE jsonb USING
    CASE
      WHEN duration IS NOT NULL THEN jsonb_build_object('fr', duration, 'en', '', 'zh', '', 'ar', '')
      ELSE NULL
    END,
  ALTER COLUMN budget TYPE jsonb USING
    CASE
      WHEN budget IS NOT NULL THEN jsonb_build_object('fr', budget, 'en', '', 'zh', '', 'ar', '')
      ELSE NULL
    END;

-- Step 2: Verify the migration
SELECT id, slug, client, duration, budget FROM realisations LIMIT 5;
