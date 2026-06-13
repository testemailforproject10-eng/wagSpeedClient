import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createServerAuthClient } from '@/lib/supabase/auth-server'
import { createServerClient } from '@/lib/supabase'
import type { WaitlistRow, ContactMessageRow } from '@/lib/supabase'
import AdminDashboard from './AdminDashboard'

// Always render fresh — this reads live data behind an auth gate.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  // Auth gate — verified Supabase session required (middleware also enforces this).
  const auth = createServerAuthClient()
  const {
    data: { user },
  } = await auth.auth.getUser()
  if (!user) redirect('/admin/login')

  // Data read uses the service-role client (RLS-bypassing), gated by the check above.
  const supabase = createServerClient()

  const [waitlistRes, messagesRes] = await Promise.all([
    supabase.from('waitlist').select('*').order('created_at', { ascending: false }),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
  ])

  const waitlist: WaitlistRow[] = waitlistRes.data ?? []
  const messages: ContactMessageRow[] = messagesRes.data ?? []
  const loadError = waitlistRes.error?.message ?? messagesRes.error?.message ?? null

  return (
    <AdminDashboard
      waitlist={waitlist}
      messages={messages}
      loadError={loadError}
      userEmail={user.email ?? null}
    />
  )
}
