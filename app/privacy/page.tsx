import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How WagSpeed collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const EFFECTIVE_DATE = 'June 11, 2026'

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-[100dvh] flex flex-col">

      {/* Nav */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-white/[0.06]">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-[18px] max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/favicon.svg" alt="WagSpeed logo" className="h-6 w-6" />
            <span
              className="font-headline-xl text-on-surface uppercase font-bold group-hover:text-primary transition-colors duration-300"
              style={{ fontSize: '22px', letterSpacing: '0.04em' }}
            >
              WAGSPEED
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-14 pb-10 border-b border-outline-variant">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
              Legal
            </p>
            <h1
              className="font-headline-xl text-on-surface uppercase"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 0.92, letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              Privacy<br />Policy
            </h1>
            <p className="font-body-md text-on-surface-variant mt-5" style={{ fontSize: '14px' }}>
              Effective: {EFFECTIVE_DATE}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-12">

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                1. Who We Are
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                WagSpeed Performance (&ldquo;WagSpeed,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates a mobile dog fitness service based in Tri-Cities, Washington. This Privacy Policy explains what information we collect when you join our waitlist and how we use it.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                2. Information We Collect
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
                When you submit our waitlist form, we collect:
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  ['Full name', 'To address you personally in communications.'],
                  ['Email address', 'To send launch updates and service announcements.'],
                  ['Phone number', 'Optional. Used only if you choose to provide it, for direct outreach about scheduling.'],
                  ['Number of dogs', 'To help us plan session capacity at launch.'],
                  ['City', 'To confirm you are within our initial service area.'],
                ].map(([field, purpose]) => (
                  <li key={field} className="grid grid-cols-[160px_1fr] gap-4 border-t border-outline-variant pt-3">
                    <span className="font-label-caps text-label-caps text-on-surface uppercase" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>{field}</span>
                    <span className="font-body-md text-on-surface-variant" style={{ fontSize: '14px' }}>{purpose}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body-md text-on-surface-variant leading-relaxed mt-6">
                We do not collect payment information, government IDs, or any sensitive personal data through the waitlist.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                3. How We Use Your Information
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed mb-3">
                Your information is used exclusively for:
              </p>
              <ul className="flex flex-col gap-2 pl-4 border-l-2 border-outline-variant">
                {[
                  'Notifying you when WagSpeed launches in your city.',
                  'Communicating service updates, scheduling windows, and launch timelines.',
                  'Planning service capacity based on aggregate demand in the Tri-Cities area.',
                  'Responding to inquiries you submit directly to us.',
                ].map((item) => (
                  <li key={item} className="font-body-md text-on-surface-variant leading-relaxed" style={{ fontSize: '15px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                4. We Do Not Sell Your Data
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                We do not sell, rent, trade, or share your personal information with third parties for marketing purposes. We will never sell your data. Full stop.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                5. Data Storage and Security
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Waitlist data is stored securely using Supabase, a SOC 2 Type II certified infrastructure provider. Access to your data is restricted to WagSpeed personnel only. We use industry-standard encryption in transit (TLS) and at rest. While no system is perfectly immune to breaches, we take reasonable technical and organizational measures to protect your information.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                6. Your Rights
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed mb-3">
                You may at any time:
              </p>
              <ul className="flex flex-col gap-2 pl-4 border-l-2 border-outline-variant">
                {[
                  'Request to view the personal information we hold about you.',
                  'Request correction of inaccurate data.',
                  'Request deletion of your waitlist entry.',
                  'Unsubscribe from all communications by following the link in any email we send.',
                ].map((item) => (
                  <li key={item} className="font-body-md text-on-surface-variant leading-relaxed" style={{ fontSize: '15px' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body-md text-on-surface-variant leading-relaxed mt-4">
                To exercise any of these rights, email us at{' '}
                <a href="mailto:jesus.fernandez@wsu.edu" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
                  jesus.fernandez@wsu.edu
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                7. Analytics &amp; Cookies
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
                We use Google Analytics to understand how visitors find and use this site so we can improve it. Google Analytics sets cookies and collects standard usage data, such as the pages you view, your approximate location (derived from your IP address, which Google anonymizes), and basic device and browser information. We use this only in aggregate; we do not use it to identify you personally.
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
                Google processes this data on our behalf as described in{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
                  Google&rsquo;s Privacy Policy
                </a>.
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                We do not use advertising pixels or sell analytics data, and we do not build individual behavioral profiles of visitors. You can opt out of Google Analytics across all sites by installing the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
                  Google Analytics Opt-out Browser Add-on
                </a>, or by blocking cookies in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                8. Changes to This Policy
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                We may update this Privacy Policy as our service evolves. When we do, we will revise the effective date at the top of this page. Material changes will be communicated to waitlist members by email.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                9. Contact
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Questions about this policy? Reach us at{' '}
                <a href="mailto:jesus.fernandez@wsu.edu" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
                  jesus.fernandez@wsu.edu
                </a>.
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-margin-mobile md:px-margin-desktop py-8 max-w-7xl mx-auto">
          <p className="font-body-md text-on-surface-variant" style={{ fontSize: '13px' }}>
            &copy; {new Date().getFullYear()} WagSpeed Performance. Tri-Cities, WA.
          </p>
          <nav className="flex gap-4">
            <Link href="/privacy" className="font-label-caps text-label-caps text-primary uppercase" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>

    </div>
  )
}
