import { ImageResponse } from 'next/og'
import { SITE_NAME, SERVICE_CITIES, REGION } from '@/lib/site'

// Static metadata for the generated social card.
export const alt =
  'WagSpeed mobile dog treadmill service delivered to your driveway in the Tri-Cities, WA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand tokens, kept in sync with tailwind.config / globals.css.
const BG = '#101418'
const ACCENT = '#005bc1'
const ACCENT_DIM = '#adc6ff'
const TEXT = '#e3e2e6'
const MUTED = '#8b90a0'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: BG,
          // Soft accent glow anchored bottom-right, echoing the site's vignette.
          backgroundImage:
            'radial-gradient(circle at 88% 112%, rgba(0,91,193,0.30), transparent 55%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Eyebrow — accent dot + service label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: ACCENT_DIM,
            }}
          />
          <div
            style={{
              color: ACCENT_DIM,
              fontSize: 24,
              letterSpacing: 6,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Mobile Dog Treadmill Service
          </div>
        </div>

        {/* Center block — wordmark + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              color: TEXT,
              fontSize: 132,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: 'flex',
              color: TEXT,
              fontSize: 46,
              lineHeight: 1.05,
              letterSpacing: -1,
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            Your dog&rsquo;s workout. Delivered to your door.
          </div>
        </div>

        {/* Footer — service area, separated by a hairline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 28,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 9999,
              backgroundColor: ACCENT,
            }}
          />
          <div
            style={{
              display: 'flex',
              color: MUTED,
              fontSize: 28,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {`${SERVICE_CITIES.join('  ·  ')}  ·  ${REGION}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
