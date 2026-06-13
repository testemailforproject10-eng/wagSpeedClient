import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createServerAuthClient } from '@/lib/supabase/auth-server'
import LoginForm from './LoginForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  // Already signed in — skip the form.
  const auth = createServerAuthClient()
  const {
    data: { user },
  } = await auth.auth.getUser()
  if (user) redirect('/admin')

  return <LoginForm />
}
