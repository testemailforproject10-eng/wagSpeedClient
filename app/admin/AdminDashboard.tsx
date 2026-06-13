'use client'

import { useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { WaitlistRow, ContactMessageRow } from '@/lib/supabase'
import { createClientAuthClient } from '@/lib/supabase/auth-browser'

type Tab = 'waitlist' | 'messages'

interface Props {
  waitlist: WaitlistRow[]
  messages: ContactMessageRow[]
  loadError: string | null
  userEmail: string | null
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

function formatDate(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '—' : dateFmt.format(d)
}

/** Count rows whose created_at falls within the last 7 days. */
function countLast7Days(rows: { created_at: string }[]): number {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000
  return rows.filter((r) => new Date(r.created_at).getTime() >= cutoff).length
}

function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const escape = (val: unknown) => {
    const s = val == null ? '' : String(val)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const header = columns.join(',')
  const body = rows.map((r) => columns.map((c) => escape(r[c])).join(',')).join('\n')
  return `${header}\n${body}`
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/* ── Small presentational pieces ─────────────────────────────────────────── */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-2 px-6 py-6 md:px-8">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
        {label}
      </span>
      <span className="font-mono text-on-surface tabular-nums" style={{ fontSize: '34px', lineHeight: 1, fontWeight: 600 }}>
        {value.toLocaleString('en-US')}
      </span>
    </div>
  )
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={`text-left font-label-caps text-label-caps text-outline uppercase tracking-widest whitespace-nowrap py-3 px-4 ${className}`}
    >
      {children}
    </th>
  )
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`align-top py-4 px-4 font-body-md text-on-surface-variant ${className}`} style={{ fontSize: '14px' }}>
      {children}
    </td>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-20 px-6 border border-dashed border-outline-variant rounded-2xl">
      <span className="material-symbols-outlined text-outline" style={{ fontSize: '40px', fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
        inbox
      </span>
      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">{title}</h3>
      <p className="font-body-md text-on-surface-variant max-w-sm" style={{ fontSize: '14px' }}>{body}</p>
    </div>
  )
}

/* ── Main ────────────────────────────────────────────────────────────────── */

export default function AdminDashboard({ waitlist, messages, loadError, userEmail }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('waitlist')
  const [query, setQuery] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  const weekWaitlist = useMemo(() => countLast7Days(waitlist), [waitlist])

  const q = query.trim().toLowerCase()

  const filteredWaitlist = useMemo(() => {
    if (!q) return waitlist
    return waitlist.filter((r) =>
      [r.name, r.email, r.phone, r.city, r.dog_count, r.preferred_day, r.preferred_time]
        .some((v) => v?.toLowerCase().includes(q))
    )
  }, [waitlist, q])

  const filteredMessages = useMemo(() => {
    if (!q) return messages
    return messages.filter((r) =>
      [r.name, r.email, r.phone, r.message].some((v) => v?.toLowerCase().includes(q))
    )
  }, [messages, q])

  const logout = useCallback(async () => {
    setLoggingOut(true)
    const supabase = createClientAuthClient()
    await supabase.auth.signOut().catch(() => {})
    router.replace('/admin/login')
    router.refresh()
  }, [router])

  const exportCsv = useCallback(() => {
    const stamp = new Date().toISOString().slice(0, 10)
    if (tab === 'waitlist') {
      const cols = ['id', 'name', 'email', 'phone', 'dog_count', 'city', 'preferred_day', 'preferred_time', 'created_at']
      downloadCsv(`waitlist-${stamp}.csv`, toCsv(waitlist as unknown as Record<string, unknown>[], cols))
    } else {
      const cols = ['id', 'name', 'email', 'phone', 'message', 'created_at']
      downloadCsv(`messages-${stamp}.csv`, toCsv(messages as unknown as Record<string, unknown>[], cols))
    }
  }, [tab, waitlist, messages])

  const activeCount = tab === 'waitlist' ? filteredWaitlist.length : filteredMessages.length
  const activeTotal = tab === 'waitlist' ? waitlist.length : messages.length

  return (
    <div className="bg-background min-h-[100dvh] flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex items-center justify-between gap-4 px-margin-mobile md:px-margin-desktop py-4 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <span
              className="font-headline-xl text-on-surface uppercase font-bold"
              style={{ fontSize: '20px', letterSpacing: '0.04em' }}
            >
              WAGSPEED
            </span>
            <span className="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-widest border border-outline-variant rounded-full px-2.5 py-1">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            {userEmail && (
              <span className="hidden md:inline-flex font-body-md text-on-surface-variant truncate max-w-[200px]" style={{ fontSize: '13px' }}>
                {userEmail}
              </span>
            )}
            <a
              href="/"
              className="hidden sm:inline-flex font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors duration-200"
            >
              View site
            </a>
            <button
              onClick={logout}
              disabled={loggingOut}
              className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface border border-outline-variant rounded-xl px-4 py-2.5 hover:border-error hover:text-error transition-colors duration-200 disabled:opacity-50 active:scale-[0.98]"
            >
              {loggingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-margin-mobile md:px-margin-desktop py-10 flex flex-col gap-10">

        {/* ── Stat strip — divided, not boxed ───────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 border border-outline-variant rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-outline-variant overflow-hidden bg-surface-container-lowest">
          <Stat label="Waitlist signups" value={waitlist.length} />
          <Stat label="Signups · last 7 days" value={weekWaitlist} />
          <Stat label="Contact messages" value={messages.length} />
        </section>

        {/* ── Load error ────────────────────────────────────────────────── */}
        {loadError && (
          <div role="alert" className="flex items-start gap-3 border border-error-container rounded-xl px-5 py-4 bg-error-container/10">
            <span className="material-symbols-outlined text-error flex-shrink-0" style={{ fontSize: '20px' }}>error</span>
            <div className="flex flex-col gap-1">
              <p className="font-label-caps text-label-caps text-error uppercase tracking-widest">Could not load data</p>
              <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px' }}>{loadError}</p>
            </div>
          </div>
        )}

        {/* ── Controls: tabs + search + export ──────────────────────────── */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl border border-outline-variant bg-surface-container-lowest self-start">
              {(['waitlist', 'messages'] as const).map((t) => {
                const active = tab === t
                const count = t === 'waitlist' ? waitlist.length : messages.length
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                      active
                        ? 'bg-surface-container-high text-on-surface'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {t === 'waitlist' ? 'Waitlist' : 'Messages'}
                    <span className={`font-mono tabular-nums ${active ? 'text-primary-fixed-dim' : 'text-outline'}`} style={{ fontSize: '11px' }}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search + export */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" style={{ fontSize: '18px' }}>
                  search
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={tab === 'waitlist' ? 'Search name, email, city…' : 'Search name, email, message…'}
                  aria-label="Search records"
                  className="industrial-input w-full"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
              <button
                onClick={exportCsv}
                disabled={activeTotal === 0}
                className="flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-on-surface border border-outline-variant rounded-xl px-4 py-2.5 hover:border-primary-fixed-dim/50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] whitespace-nowrap"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
                CSV
              </button>
            </div>
          </div>

          {/* Result count */}
          <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
            {q
              ? `${activeCount} of ${activeTotal} ${tab === 'waitlist' ? 'signups' : 'messages'} match “${query.trim()}”`
              : `${activeTotal} total ${tab === 'waitlist' ? 'signups' : 'messages'}`}
          </p>
        </section>

        {/* ── Tables ────────────────────────────────────────────────────── */}
        {tab === 'waitlist' ? (
          filteredWaitlist.length === 0 ? (
            <EmptyState
              title={q ? 'No matches' : 'No signups yet'}
              body={q ? 'Try a different search term.' : 'Waitlist entries will appear here as people sign up.'}
            />
          ) : (
            <div className="border border-outline-variant rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-surface-container-lowest border-b border-outline-variant">
                    <tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Dogs</Th>
                      <Th>City</Th>
                      <Th>Day</Th>
                      <Th>Time</Th>
                      <Th>Joined</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {filteredWaitlist.map((r) => (
                      <tr key={r.id} className="hover:bg-surface-container-lowest/60 transition-colors duration-150">
                        <Td className="text-on-surface whitespace-nowrap">{r.name || '—'}</Td>
                        <Td className="whitespace-nowrap">
                          <a href={`mailto:${r.email}`} className="text-on-surface-variant hover:text-primary-fixed-dim underline underline-offset-4 decoration-outline-variant">
                            {r.email}
                          </a>
                        </Td>
                        <Td className="font-mono whitespace-nowrap" >{r.phone || '—'}</Td>
                        <Td className="font-mono tabular-nums">{r.dog_count || '—'}</Td>
                        <Td className="whitespace-nowrap">{r.city || '—'}</Td>
                        <Td className="whitespace-nowrap">{r.preferred_day || '—'}</Td>
                        <Td className="whitespace-nowrap">{r.preferred_time || '—'}</Td>
                        <Td className="font-mono text-outline whitespace-nowrap">{formatDate(r.created_at)}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : filteredMessages.length === 0 ? (
          <EmptyState
            title={q ? 'No matches' : 'No messages yet'}
            body={q ? 'Try a different search term.' : 'Messages from the contact form will appear here.'}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {filteredMessages.map((r) => (
              <article key={r.id} className="border border-outline-variant rounded-2xl bg-surface-container-lowest p-6 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase truncate">
                      {r.name}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a href={`mailto:${r.email}`} className="font-body-md text-on-surface-variant hover:text-primary-fixed-dim underline underline-offset-4 decoration-outline-variant" style={{ fontSize: '13px' }}>
                        {r.email}
                      </a>
                      {r.phone && (
                        <span className="font-mono text-on-surface-variant" style={{ fontSize: '13px' }}>{r.phone}</span>
                      )}
                    </div>
                  </div>
                  <time className="font-mono text-outline whitespace-nowrap" style={{ fontSize: '12px' }}>
                    {formatDate(r.created_at)}
                  </time>
                </div>
                <p className="font-body-md text-on-surface-variant leading-relaxed border-l-2 border-outline-variant pl-4 whitespace-pre-wrap">
                  {r.message}
                </p>
              </article>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}
