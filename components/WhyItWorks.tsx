const pillars = [
  {
    num: '01',
    title: 'Real endurance, real results',
    body: 'When your dog runs at a steady pace for a full 30 minutes, their body actually has to work. That sustained effort is what builds real endurance — and what leaves them satisfied and settled, not just a little winded. You\'ll notice the difference the moment they walk back in the door.',
  },
  {
    num: '02',
    title: 'Stronger body, better movement',
    body: 'A treadmill belt works muscles that regular walks don\'t fully reach — especially the hindquarters and core. Over time, sessions build balanced strength across the whole body. Stronger dogs move better, recover faster, and hold up better as they age.',
  },
  {
    num: '03',
    title: 'Calmer behavior that actually lasts',
    body: 'Sustained running triggers a real stress-relief response in dogs — the same one that makes humans feel better after a solid workout. One 30-minute session measurably lowers stress hormones and leaves most dogs noticeably calmer for hours. Regular sessions compound that: less barking, less anxiety, less destruction.',
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
            The Science
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
              What happens when your dog actually gets tired.
            </h2>

            {/* Stat block */}
            <div className="flex flex-col gap-2.5 pl-5" style={{ borderLeft: '2px solid #005bc1' }}>
              <span
                className="text-primary"
                style={{ fontFamily: 'var(--font-archivo-narrow)', fontSize: 'clamp(44px, 5vw, 60px)', lineHeight: 1, fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                34&ndash;41%
              </span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest leading-relaxed">
                of dogs are overweight or obese worldwide
              </span>
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                Source: Peer-reviewed veterinary studies
              </span>
            </div>
          </div>

          {/* Right: body copy */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:pt-1">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Most dogs aren&rsquo;t getting enough real exercise. A walk around the block gets them moving, but it doesn&rsquo;t wear them out. The kind of exercise that actually changes behavior &mdash; calmer at home, less reactive on the leash, deeper sleep at night &mdash; requires sustained effort at the right intensity for long enough to matter.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              A study of over 11,000 dogs found that dogs who get regular vigorous exercise are significantly calmer, less anxious, and better behaved at home. The reason is straightforward: sustained running triggers a real stress-relief response. A 30-minute session doesn&rsquo;t just tire them out &mdash; it resets them.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              WagSpeed sessions are built around exactly this kind of exercise. Consistent pace, full 30 minutes, and a load that grows with your dog&rsquo;s fitness over time. Not a stroll &mdash; a workout.
            </p>
          </div>

        </div>

        {/* ── Three pillars — editorial rows ────────────────── */}
        <div className="flex flex-col divide-y divide-outline-variant border-t border-b border-outline-variant">
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

      </div>
    </section>
  )
}
