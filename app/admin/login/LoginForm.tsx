'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClientAuthClient } from '@/lib/supabase/auth-browser'

type Status = 'idle' | 'submitting' | 'error'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || !password || status === 'submitting') return

      setStatus('submitting')
      setError('')

      const supabase = createClientAuthClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (signInError) {
        // Supabase returns a generic message for bad credentials — keep it generic.
        setError('Incorrect email or password.')
        setStatus('error')
        setPassword('')
        return
      }

      // Full navigation so the server re-reads the refreshed session cookie.
      router.replace('/admin')
      router.refresh()
    },
    [email, password, status, router]
  )

  const clearError = () => {
    if (status === 'error') setStatus('idle')
  }

  return (
    <div className="bg-background min-h-[100dvh] flex flex-col">
      <main className="flex-grow flex items-center px-margin-mobile md:px-margin-desktop py-24">
        <div className="w-full max-w-md mx-auto flex flex-col gap-10">

          {/* Heading */}
          <div className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                Restricted
              </span>
            </div>
            <h1
              className="font-headline-xl text-on-surface uppercase"
              style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 0.92, letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              Admin<br />access
            </h1>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Sign in with your WagSpeed admin account to view waitlist signups and contact messages.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-email" className="sr-only">Email</label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError() }}
                disabled={status === 'submitting'}
                placeholder="Email"
                aria-invalid={status === 'error'}
                className="industrial-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-password" className="sr-only">Password</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError() }}
                disabled={status === 'submitting'}
                placeholder="Password"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'admin-error' : undefined}
                className="industrial-input"
              />
              {status === 'error' && (
                <p id="admin-error" role="alert" className="font-label-caps text-label-caps text-error mt-1">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting' || !email || !password}
              className="submit-btn bg-white text-[#0d0f12] font-label-caps text-label-caps uppercase px-6 py-[14px] hover:bg-white/90 flex items-center justify-center gap-2 rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              {status === 'submitting' ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

        </div>
      </main>
    </div>
  )
}
