import WaitlistForm from '@/components/WaitlistForm'
import WhyItWorks from '@/components/WhyItWorks'

const STATS = [
  { icon: 'speed',             label: 'Pace:',    value: 'Custom'     },
  { icon: 'device_thermostat', label: 'Climate:', value: 'Controlled' },
  { icon: 'timer',             label: 'Session:', value: '30 Min'     },
  { icon: 'show_chart',        label: 'Metrics:', value: 'Tracked'    },
]

export default function HomePage() {
  return (
    <div className="bg-background min-h-[100dvh] flex flex-col overflow-x-hidden">

      {/* ── Nav ──────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-white/[0.06]">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-[18px] max-w-7xl mx-auto">
          <div className="flex items-center">
            <img src="/favicon.svg" alt="WagSpeed logo" className="h-6 w-6 mr-2" />
            <span
              className="font-headline-xl text-on-surface uppercase font-bold"
              style={{ fontSize: '22px', letterSpacing: '0.04em' }}
            >
              WAGSPEED
            </span>
          </div>
          <a
            href="#waitlist-form"
            className="submit-btn bg-white text-[#0d0f12] font-label-caps text-label-caps uppercase px-6 py-[11px] hover:bg-white/90 flex items-center gap-2 rounded-sm font-bold"
          >
            Join Waitlist
          </a>
        </div>
      </header>

      <main className="flex-grow">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative w-full min-h-[100dvh] flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden">

          {/* Background — full bleed */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-surface-container-lowest">
            <img
              src="/van-dogs.jpg"
              alt="Dogs running on a professional treadmill inside the WagSpeed van"
              className="absolute inset-0 w-full h-full object-cover hero-image-filter"
              style={{ objectPosition: '65% center', background: 'black', opacity: 0.3}}
            />
            {/* Left vignette — dark behind headline text */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
            {/* Right vignette — heavily darkens behind the glass form so frosted effect reads correctly */}
            <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-background/20 to-transparent" />
            {/* Bottom fade into next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          {/* Split grid — text takes all remaining space, form is fixed-width */}
          <div className="relative z-20 w-full pt-24 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-12 items-center">

            {/* Left — headline + body + stats */}
            <div className="flex flex-col gap-7">

              {/* Massive display headline */}
              <h1
                className="animate-fade-up stagger-1 font-headline-xl text-on-surface uppercase"
                style={{
                  fontSize:      'clamp(72px, 8.5vw, 118px)',
                  lineHeight:    0.88,
                  letterSpacing: '-0.03em',
                  fontWeight:    700,
                }}
              >
                Your dog&rsquo;s workout.<br />
                Delivered to your door.
              </h1>

              {/* Body copy */}
              <p className="animate-fade-up stagger-2 font-body-md text-on-surface-variant max-w-[460px] leading-relaxed" style={{ fontSize: '18px' }}>
                A mobile van brings a professional treadmill to your driveway. Your dog gets a real workout — without you lifting a finger.
              </p>

              {/* Stats strip — large icon + stacked label/value */}
              <div className="animate-fade-up stagger-3 flex flex-wrap items-center gap-7 md:gap-10">
                {STATS.map(({ icon, label, value }) => (
                  <div key={icon} className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-white flex-shrink-0"
                      style={{ fontSize: '40px', fontVariationSettings: "'FILL' 0, 'wght' 200" }}
                    >
                      {icon}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="uppercase text-on-surface-variant"
                        style={{ fontFamily: 'var(--font-hanken-grotesk)', fontSize: '10px', letterSpacing: '0.14em', fontWeight: 700 }}
                      >
                        {label}
                      </span>
                      <span
                        className="font-headline-xl uppercase text-white font-bold"
                        style={{ fontSize: '18px', letterSpacing: '0.03em', lineHeight: 1 }}
                      >
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="animate-fade-up stagger-4" id="waitlist-form">
              <WaitlistForm />
            </div>

          </div>

          {/* Scroll indicator — bottom center, hidden on mobile where form stacks below stats */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1.5 pointer-events-none">
            <span
              className="font-label-caps text-on-surface-variant uppercase opacity-40"
              style={{ fontSize: '9px', letterSpacing: '0.18em', fontFamily: 'var(--font-hanken-grotesk)', fontWeight: 700 }}
            >
              Scroll
            </span>
            <span
              className="material-symbols-outlined text-on-surface-variant opacity-45 animate-scroll-bounce"
              style={{ fontSize: '22px' }}
            >
              keyboard_arrow_down
            </span>
          </div>

        </section>

        {/* ── How It Works ──────────────────────────────────── */}
        <section className="w-full border-t border-b border-outline-variant bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-outline-variant">

              <div className="flex flex-col gap-4 md:pr-12 pb-10 md:pb-0 border-b border-outline-variant md:border-b-0">
                <div className="w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center bg-surface-container">
                  <span className="font-label-caps text-label-caps text-on-surface-variant" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>01</span>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">Book Online</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Schedule a session in seconds. Pick the time that works — we take it from there.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:px-12 py-10 md:py-0 border-b border-outline-variant md:border-b-0">
                <div className="w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center bg-surface-container">
                  <span className="font-label-caps text-label-caps text-on-surface-variant" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>02</span>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">We Drive to You</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Our climate-controlled van parks in your driveway. No drop-off, no commute.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-10 md:pt-0 md:pl-12">
                <div className="w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center bg-surface-container">
                  <span className="font-label-caps text-label-caps text-on-surface-variant" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>03</span>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">Your Dog Trains</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  A certified trainer guides a custom treadmill session. Real output. Real metrics.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Why It Works ──────────────────────────────────── */}
        <WhyItWorks />

      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md px-margin-mobile md:px-margin-desktop py-stack-lg max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="" className="h-6 w-6 opacity-50" aria-hidden="true" />
              <span className="font-headline-lg text-headline-lg text-on-surface uppercase font-bold tracking-tighter">
                WagSpeed
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              &copy; {new Date().getFullYear()} WagSpeed Performance. Engineered for canines.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-6">
            <nav className="flex flex-wrap gap-4 md:justify-end">
              <a href="/privacy" className="font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300">Terms of Service</a>
            </nav>
            <span className="font-label-caps text-label-caps text-outline uppercase border border-outline px-2 py-1 self-start md:self-end">
              Launching: Tri-Cities, WA
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}
