import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { Database } from './types'

/**
 * Session-aware Supabase client for Server Components and Route Handlers.
 * Reads/writes the auth cookies so `auth.getUser()` reflects the logged-in admin.
 * Uses the public anon key — this client is only for authentication, not for
 * privileged data reads (those still go through the service-role client).
 */
export function createServerAuthClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Server Components can't set cookies — that's fine, the middleware
          // refreshes the session and writes them. Swallow the error here.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            /* called from a Server Component — safe to ignore */
          }
        },
      },
    }
  )
}
