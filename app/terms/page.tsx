import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using WagSpeed\'s waitlist and services.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

const EFFECTIVE_DATE = 'June 11, 2026'

export default function TermsPage() {
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
              Terms of<br />Service
            </h1>
            <p className="font-body-md text-on-surface-variant mt-5" style={{ fontSize: '14px' }}>
              Effective: {EFFECTIVE_DATE}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-12">

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                1. Acceptance
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                By submitting the WagSpeed waitlist form or accessing this website, you agree to be bound by these Terms of Service. If you do not agree, do not submit the form or use the site. These terms apply to the waitlist service only; separate service agreements will govern booked sessions once WagSpeed launches.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                2. The Waitlist
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed mb-3">
                Joining the WagSpeed waitlist:
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'Does not constitute a purchase, reservation, or binding contract for services.',
                  'Does not guarantee availability of sessions at launch.',
                  'Grants you priority access consideration in the order you signed up.',
                  'Requires a valid email address. Submissions with false information may be removed.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start border-t border-outline-variant pt-3">
                    <span className="text-outline mt-0.5 flex-shrink-0" style={{ fontSize: '12px' }}>—</span>
                    <span className="font-body-md text-on-surface-variant leading-relaxed" style={{ fontSize: '15px' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                3. Service Description
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                WagSpeed provides mobile dog fitness sessions delivered to your location via a climate-controlled van equipped with a professional treadmill. Sessions are facilitated by trained handlers. The service is currently pre-launch; all descriptions of the service on this website represent our intended offering and are subject to change before and after launch.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                4. Service Area
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                At launch, WagSpeed will operate exclusively in the Tri-Cities area of Washington State (Kennewick, Richland, and Pasco). Joining the waitlist from outside this area does not guarantee service. WagSpeed reserves the right to expand, adjust, or restrict its service area at any time.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                5. Removal from Waitlist
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                You may remove yourself from the waitlist at any time by emailing{' '}
                <a href="mailto:jesus.fernandez@wsu.edu" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
                  jesus.fernandez@wsu.edu
                </a>{' '}
                with the subject &ldquo;Remove me from the waitlist.&rdquo; We will process your request within 5 business days. WagSpeed also reserves the right to remove entries that contain false, duplicate, or abusive information.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                6. Intellectual Property
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                All content on this website, including text, images, logos, and design, is owned by WagSpeed Performance and may not be reproduced, distributed, or used without our written permission.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                7. Disclaimer of Warranties
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                This website and the waitlist service are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components. We make no guarantee regarding the launch date, pricing, or availability of our services.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                8. Limitation of Liability
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                To the maximum extent permitted by applicable law, WagSpeed Performance shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or the waitlist. Our total liability to you for any claim arising under these terms shall not exceed $100 USD.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                9. Governing Law
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                These terms are governed by the laws of the State of Washington, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Benton County, Washington.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                10. Changes to These Terms
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                We may update these Terms of Service at any time. The effective date at the top of this page will reflect the most recent revision. Continued use of the site or waitlist after changes are posted constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-headline-xl text-on-surface uppercase mb-4" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700 }}>
                11. Contact
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Questions about these terms? Email us at{' '}
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
            <Link href="/privacy" className="font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-label-caps text-label-caps text-primary uppercase" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>

    </div>
  )
}
