import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the WagSpeed team in the Tri-Cities, WA. Questions, partnerships, or just curious — we read everything.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact WagSpeed',
    description: 'Get in touch with the WagSpeed team in the Tri-Cities, WA.',
    url: '/contact',
    type: 'website',
    // Defining openGraph here drops the inherited file-convention image,
    // so point it back at the generated 1200x630 card.
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
}

const TOPICS = [
  'Questions about the service',
  'Scheduling or availability',
  'Partnerships or press',
  'Anything else',
]

export default function ContactPage() {
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
        <div className="max-w-7xl mx-auto">

          {/* Asymmetric split: 2/5 info — 3/5 form */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">

            {/* Left — editorial info */}
            <div className="flex flex-col gap-10 lg:sticky lg:top-32">

              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                    Contact
                  </span>
                </div>

                <h1
                  className="font-headline-xl text-on-surface uppercase"
                  style={{ fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: 0.92, letterSpacing: '-0.02em', fontWeight: 700 }}
                >
                  Let&rsquo;s<br />talk.
                </h1>

                <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-sm">
                  We&rsquo;re a small team and we read every message. Whether you have a question about the service, want to know when we&rsquo;re launching, or just want to say hi — reach out.
                </p>
              </div>

              {/* What you can reach out about */}
              <div className="flex flex-col gap-0 border-t border-outline-variant">
                {TOPICS.map((topic) => (
                  <div key={topic} className="flex items-center gap-3 py-3.5 border-b border-outline-variant">
                    <span
                      className="material-symbols-outlined text-outline flex-shrink-0"
                      style={{ fontSize: '16px', fontVariationSettings: "'FILL' 0, 'wght' 200" }}
                    >
                      arrow_forward
                    </span>
                    <span className="font-body-md text-on-surface-variant" style={{ fontSize: '14px' }}>
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-surface-container border border-outline-variant rounded-2xl p-8 md:p-10">
              <div className="mb-8 pb-7 border-b border-outline-variant">
                <h2
                  className="font-headline-xl text-on-surface uppercase"
                  style={{ fontSize: '22px', letterSpacing: '-0.01em', lineHeight: 1.1, fontWeight: 700 }}
                >
                  Send a message
                </h2>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mt-2">
                  We typically respond within one business day
                </p>
              </div>
              <ContactForm />
            </div>

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
            <Link href="/terms" className="font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>

    </div>
  )
}
