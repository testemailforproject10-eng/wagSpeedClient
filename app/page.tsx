import Image from 'next/image'
import WaitlistForm from '@/components/WaitlistForm'
import WhyItWorks from '@/components/WhyItWorks'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'
import { faqSchema } from '@/lib/schema'
import { SERVICE_CITIES } from '@/lib/site'

const FAQS = [
  {
    q: 'What cities does WagSpeed serve?',
    a: 'WagSpeed is a mobile dog treadmill service for the Tri-Cities, WA — Kennewick, Pasco, Richland, and West Richland. Our van comes to your driveway, so there is no drop-off or commute.',
  },
  {
    q: 'How does the mobile dog treadmill service work?',
    a: 'Book a session online, our climate-controlled van parks in your driveway, and an experienced handler guides your dog through a custom 30-minute treadmill workout with real, tracked metrics.',
  },
  {
    q: 'Is treadmill exercise safe for my dog?',
    a: 'Yes. Sessions are run by an experienced handler who sets the pace and load to your dog’s fitness level, inside a climate-controlled environment. The workout builds endurance and core and hindquarter strength at an intensity that is safe and effective.',
  },
  {
    q: 'How long is each session and what does it cost?',
    a: 'Each session is a full 30 minutes. WagSpeed is launching in the Tri-Cities soon — join the waitlist for launch pricing and to secure your priority spot.',
  },
  {
    q: 'What kind of dogs is WagSpeed for?',
    a: 'Most healthy dogs benefit, especially high-energy breeds and dogs that need to lose weight or burn off anxious energy. A sustained 30-minute run lowers stress hormones and leaves dogs noticeably calmer for hours.',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Book Online',
    body: 'Schedule a session in seconds. Pick the time that works — we take it from there.',
    cell: 'md:pr-12 pb-10 md:pb-0 border-b border-outline-variant md:border-b-0',
  },
  {
    num: '02',
    title: 'We Drive to You',
    body: 'Our climate-controlled van parks in your driveway. No drop-off, no commute.',
    cell: 'md:px-12 py-10 md:py-0 border-b border-outline-variant md:border-b-0',
  },
  {
    num: '03',
    title: 'Your Dog Trains',
    body: 'An experienced handler guides a custom treadmill session. Real output. Real metrics.',
    cell: 'pt-10 md:pt-0 md:pl-12',
  },
]

const STATS = [
  { icon: 'speed',             label: 'Pace',    value: 'Custom'     },
  { icon: 'device_thermostat', label: 'Climate', value: 'Controlled' },
  { icon: 'timer',             label: 'Session', value: '30 Min'     },
  { icon: 'show_chart',        label: 'Metrics', value: 'Tracked'    },
]

export default function HomePage() {
  return (
    <div className="bg-background min-h-[100dvh] flex flex-col overflow-x-hidden">

      {/* ── Nav ──────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-white/[0.06]">
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
          <nav className="flex items-center gap-6">
            <a
              href="/contact"
              className="hidden sm:inline-flex font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
            <a
              href="#waitlist-form"
              className="submit-btn bg-white text-[#0d0f12] font-label-caps text-label-caps uppercase px-6 py-[11px] hover:bg-white/90 flex items-center gap-2 rounded-xl font-bold"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative w-full min-h-[100dvh] flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden">

          {/* Background — full bleed */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-surface-container-lowest">
            <Image
              src="/van-dogs.jpg"
              alt="Dogs running on a professional treadmill inside the WagSpeed van"
              fill
              priority
              sizes="100vw"
              className="object-cover hero-image-filter"
              style={{ objectPosition: '65% center', background: 'black', opacity: 0.45 }}
            />
            {/* Left vignette — dark behind headline text */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-transparent" />
            {/* Right vignette — heavily darkens behind the glass form so frosted effect reads correctly */}
            <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-background/20 to-transparent" />
            {/* Bottom fade into next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          {/* Split grid — text takes all remaining space, form is fixed-width */}
          <div className="relative z-20 w-full pt-24 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-12 items-center">

            {/* Left — headline + body + stats */}
            <div className="flex flex-col gap-7 min-w-0">

              {/* Massive display headline */}
              <h1
                className="animate-fade-up stagger-1 font-headline-xl text-on-surface uppercase"
                style={{
                  fontSize:      'clamp(44px, 10vw, 118px)',
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
                      style={{ fontSize: 'clamp(32px, 3vw, 40px)', fontVariationSettings: "'FILL' 0, 'wght' 200" }}
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
            <div className="animate-fade-up stagger-4 min-w-0 scroll-mt-24" id="waitlist-form">
              <WaitlistForm />
            </div>

          </div>

        </section>

        {/* ── How It Works ──────────────────────────────────── */}
        <section className="w-full border-t border-b border-outline-variant bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
            <Reveal className="mb-12 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                  How It Works
                </span>
              </div>
              <h2
                className="font-headline-xl text-on-surface uppercase max-w-2xl"
                style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 700 }}
              >
                From your driveway to done in 30 minutes.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-outline-variant">
              {STEPS.map(({ num, title, body, cell }, i) => (
                <Reveal key={num} delay={i * 120} className={cell}>
                  <div className="group flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center bg-surface-container transition-colors duration-300 group-hover:border-primary-fixed-dim/40">
                      <span className="font-label-caps text-label-caps text-on-surface-variant" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>{num}</span>
                    </div>
                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">{title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Inside the Van ────────────────────────────────── */}
        <section className="w-full bg-background">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-12 md:pb-16">
            <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-end">
              <div className="lg:col-span-6 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                    Inside the Van
                  </span>
                </div>
                <h2
                  className="font-headline-xl text-on-surface uppercase"
                  style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 700 }}
                >
                  The whole gym, parked in your driveway.
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-[52ch]">
                  A professional treadmill, climate control, and an experienced handler on board.
                  Your dog walks out the front door and straight into a workout.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Full-bleed photo — the one place the image gets seen clean */}
          <Reveal>
            <div className="media-reveal relative w-full overflow-hidden aspect-[5/4] md:aspect-auto md:h-[clamp(340px,62vh,660px)]">
              <Image
                src="/van-dogs.jpg"
                alt="Two dogs running on the professional treadmill inside the climate-controlled WagSpeed van"
                fill
                sizes="100vw"
                className="object-cover object-center md:object-[65%_center]"
                style={{ filter: 'saturate(0.95) contrast(1.04)' }}
              />
            </div>
          </Reveal>
        </section>

        {/* ── Why It Works ──────────────────────────────────── */}
        <WhyItWorks />

        {/* ── Service Area ──────────────────────────────────── */}
        <section className="w-full bg-surface-container-lowest border-t border-outline-variant">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
            <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
              <div className="lg:col-span-5 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                    Service Area
                  </span>
                </div>
                <h2
                  className="font-headline-xl text-on-surface uppercase"
                  style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 700 }}
                >
                  Bringing the workout to the Tri-Cities.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-[52ch]">
                  WagSpeed is a mobile dog treadmill service launching across the Tri-Cities, WA.
                  If you live in Kennewick, Pasco, Richland, or West Richland, our van comes
                  straight to your driveway — no drop-off, no commute.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-2 gap-px bg-outline-variant border border-outline-variant">
                {SERVICE_CITIES.map((city) => (
                  <div key={city} className="bg-surface-container-lowest flex items-center gap-3 px-6 py-7">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                      location_on
                    </span>
                    <div className="flex flex-col">
                      <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">{city}</span>
                      <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Washington</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="w-full bg-background border-t border-outline-variant">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
            <Reveal className="mb-12 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                  FAQ
                </span>
              </div>
              <h2
                className="font-headline-xl text-on-surface uppercase max-w-2xl"
                style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 700 }}
              >
                Questions, answered.
              </h2>
            </Reveal>
            <div className="flex flex-col divide-y divide-outline-variant border-t border-b border-outline-variant">
              {FAQS.map(({ q, a }, i) => (
                <Reveal
                  key={q}
                  delay={i * 80}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10"
                >
                  <div className="md:col-span-5">
                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">
                      {q}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FAQ structured data */}
      <JsonLd data={faqSchema(FAQS)} />

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
              &copy; {new Date().getFullYear()} WagSpeed Performance. Built for dogs who love to run.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-6">
            <nav className="flex flex-wrap gap-4 md:justify-end">
              <a href="/contact" className="font-label-caps text-label-caps text-on-surface-variant uppercase hover:text-primary transition-colors duration-300">Contact</a>
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
