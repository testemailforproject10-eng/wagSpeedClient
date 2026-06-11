const pillars = [
  {
    num: '01',
    title: 'Cardiovascular output',
    body: 'A treadmill maintains a consistent pace for the entire session. That continuous load keeps heart rate elevated in the cardiovascular training zone — the threshold where real physiological adaptation happens. Each session builds cardiac output, improves circulation, and compounds into long-term stamina.',
  },
  {
    num: '02',
    title: 'Neuromuscular activation',
    body: 'The moving belt engages the posterior chain — hamstrings, glutes, and lower back — through a range of motion that standard forward walking tends to underutilize. Regular sessions develop balanced, full-body strength, better gait mechanics, and a more resilient musculoskeletal system overall.',
  },
  {
    num: '03',
    title: 'Endorphin release',
    body: 'Sustained aerobic exercise drives a measurable endorphin response in dogs — the same biochemical mechanism documented in human runners. A single 30-minute session measurably lowers cortisol, reduces baseline anxiety, and delivers a neurological reset that carries well beyond the run itself.',
  },
]

const comparison = [
  {
    label: 'Heart rate',
    walk: 'Naturally varies with stops, sniffing, and direction changes — typically holds cardiovascular threshold for only brief stretches',
    run:  'Sustained at target zone for the full 30 minutes, driving consistent cardiovascular adaptation',
  },
  {
    label: 'Muscle load',
    walk: 'Primarily anterior chain activation with gait variation from leash mechanics and terrain — great for joint mobility and engagement',
    run:  'Full posterior chain engagement via consistent, controlled belt mechanics — building balanced strength across the whole body',
  },
  {
    label: 'Consistency',
    walk: 'Intensity varies naturally with weather, pace, and terrain — highly adaptable and enriching',
    run:  'Climate-controlled, same pace parameters every session, year-round — reliable stimulus for progressive conditioning',
  },
  {
    label: 'Stress response',
    walk: 'Meaningful mental stimulation and mild stress relief through novelty, scent, and social input',
    run:  'Measurable endorphin release, cortisol reduction, and behavioral calm that compounds with regular sessions',
  },
  {
    label: 'Progressive load',
    walk: 'Flexible and exploratory by nature — great for recovery days and mental enrichment',
    run:  'Speed and duration calibrated upward as your dog builds capacity, ensuring continued progress over time',
  },
]

export default function WhyItWorks() {
  return (
    <section className="w-full bg-background border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32">

        {/* Section label */}
        <div className="inline-flex items-center gap-2 mb-12">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
            The Physiology
          </span>
        </div>

        {/* ── Opening: asymmetric split ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start mb-24">

          {/* Left: headline + stat block */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <h2
              className="font-headline-xl text-on-surface uppercase"
              style={{ fontSize: 'clamp(38px, 4vw, 52px)', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              What real<br />cardio delivers.
            </h2>

            {/* Stat block */}
            <div className="flex flex-col gap-2.5 pl-5" style={{ borderLeft: '2px solid #005bc1' }}>
              <span
                className="text-primary"
                style={{ fontFamily: 'var(--font-archivo-narrow)', fontSize: 'clamp(44px, 5vw, 60px)', lineHeight: 1, fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                34–41%
              </span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest leading-relaxed">
                of dogs globally are overweight or obese
              </span>
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                Source: Peer-reviewed veterinary studies
              </span>
            </div>
          </div>

          {/* Right: body copy */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:pt-1">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Sustained cardiovascular exercise — the kind that holds heart rate in a target zone for an extended, uninterrupted period — triggers physiological adaptations that shorter or intermittent activity simply can&rsquo;t produce. Stronger cardiac output, improved body composition, and lower resting cortisol are the outcomes of regular, intensity-appropriate conditioning.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              The behavioral benefits are equally well-documented. A large UK study of 11,154 dogs found a significant correlation between regular vigorous exercise and reduced anxiety behaviors, calmer temperament, and fewer stress-related responses. The mechanism is biochemical: sustained aerobic activity drives endorphin release and cortisol clearance in ways that brief, interrupted bursts of movement don&rsquo;t reliably reach.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              WagSpeed sessions are designed to deliver exactly this kind of conditioning — consistent pace, full session duration, and progressive load adjusted as your dog builds fitness.
            </p>
          </div>

        </div>

        {/* ── Three science pillars — editorial rows ────────── */}
        <div className="flex flex-col divide-y divide-outline-variant border-t border-b border-outline-variant mb-24">
          {pillars.map(({ num, title, body }) => (
            <div
              key={num}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 transition-colors duration-300"
            >
              <div className="md:col-span-1">
                <span
                  className="font-data-display text-data-display text-outline group-hover:text-on-surface-variant tracking-widest transition-colors duration-300"
                  style={{ fontSize: '14px' }}
                >
                  {num}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">
                  {title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors duration-300">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Comparison table ──────────────────────────────── */}
        <div className="mb-16">
          <h3
            className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase mb-8"
            style={{ letterSpacing: '-0.01em' }}
          >
            Walk vs. 30-min run — side by side
          </h3>

          {/* Outer wrapper: scrollable on mobile, full table on md+ */}
          <div className="overflow-x-auto -mx-margin-mobile md:mx-0 px-margin-mobile md:px-0">
            <div className="min-w-[600px] border border-outline-variant overflow-hidden rounded-2xl">

              {/* Header row */}
              <div className="grid grid-cols-12 border-b border-outline-variant">
                {/* Empty label cell */}
                <div className="col-span-3 px-5 py-4 border-r border-outline-variant bg-surface-container-lowest" />

                {/* Walk column header */}
                <div className="col-span-4 px-5 py-4 border-r border-outline-variant bg-surface-container-lowest">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-on-surface-variant flex-shrink-0"
                      style={{ fontSize: '16px' }}
                    >
                      directions_walk
                    </span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                      Regular walk
                    </span>
                  </div>
                </div>

                {/* WagSpeed column header */}
                <div className="col-span-5 px-5 py-4 bg-primary/10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot flex-shrink-0" />
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                      30-min WagSpeed run
                    </span>
                  </div>
                </div>
              </div>

              {/* Data rows */}
              {comparison.map(({ label, walk, run }, i) => (
                <div
                  key={label}
                  className={`grid grid-cols-12 border-b border-outline-variant last:border-b-0 transition-colors duration-200 hover:bg-surface-container-lowest/40 ${
                    i % 2 === 1 ? 'bg-surface-container-lowest/30' : ''
                  }`}
                >
                  <div className="col-span-3 px-5 py-5 border-r border-outline-variant flex items-start">
                    <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">
                      {label}
                    </span>
                  </div>
                  <div className="col-span-4 px-5 py-5 border-r border-outline-variant">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {walk}
                    </p>
                  </div>
                  <div className="col-span-5 px-5 py-5">
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      {run}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* ── Closing note ──────────────────────────────────── */}
        <div className="border-l-2 border-outline-variant pl-5 step-accent">
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
            Every WagSpeed session is calibrated by a certified trainer to your dog&rsquo;s breed, age, weight, and current fitness level. The daily walk still happens — it provides the sniffing, socialization, and mental engagement dogs thrive on. WagSpeed adds the high-intensity athletic conditioning that takes your dog&rsquo;s health and fitness further.
          </p>
        </div>

      </div>
    </section>
  )
}
