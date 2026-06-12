// Server client — re-exported as `createClient` for backward compat with existing imports
export { createServerClient as createClient } from './server'

// Explicit named exports for new code
export { createServerClient } from './server'
export { createBrowserClient } from './client'

// Types
export type { Database, WaitlistRow, WaitlistInsert, ContactMessageRow, ContactMessageInsert } from './types'
