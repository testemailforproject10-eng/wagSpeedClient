'use client'

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * Browser-only Supabase client.
 * Uses the anon key — never the service role key.
 * Only import this inside Client Components ('use client').
 */
export function createBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
