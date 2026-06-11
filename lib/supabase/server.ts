import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing required env var: ${key}`)
  return value
}

/**
 * Server-only Supabase client.
 * Uses the service role key when available (bypasses RLS for trusted server writes).
 * Falls back to anon key if service role is not configured.
 * autoRefreshToken and persistSession are disabled — sessions are meaningless server-side.
 */
export function createServerClient() {
  const url = requireEnv('NEXT_PUBLIC_SUPABASE_URL')
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
