/**
 * Single source of truth for site-wide SEO config.
 * Change SITE_URL here and it propagates to metadata, canonicals,
 * the sitemap, robots.txt, and all JSON-LD structured data.
 */

export const SITE_URL = 'https://wagspeed.com'
export const SITE_NAME = 'WagSpeed'
export const CONTACT_EMAIL = 'jesus.fernandez@wsu.edu'

// Public phone number, E.164-ish format (e.g. '+1-509-555-0147').
// Leave empty until a real number exists — it flows into LocalBusiness schema.
export const CONTACT_PHONE = ''

// Public social/profile URLs. Each one added here becomes a `sameAs` entry in
// the Organization schema, which is how Google links your brand entity together.
// e.g. 'https://www.instagram.com/wagspeed'
export const SOCIAL_PROFILES: string[] = []

// Tri-Cities, WA service area — drives both the JSON-LD areaServed
// and the visible service-area copy on the page.
export const SERVICE_CITIES = [
  'Kennewick',
  'Pasco',
  'Richland',
  'West Richland',
] as const

export const REGION = 'WA'
export const REGION_NAME = 'Washington'
export const SERVICE_AREA_LABEL = 'Tri-Cities, WA'

// Geographic center of the Tri-Cities (Kennewick), used for geo schema.
export const GEO = { latitude: 46.2112, longitude: -119.1372 }

/** Resolve a path against the canonical site origin. */
export const url = (path = '/') =>
  new URL(path, SITE_URL).toString().replace(/\/$/, '') || SITE_URL
