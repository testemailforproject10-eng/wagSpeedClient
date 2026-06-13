import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SOCIAL_PROFILES,
  SERVICE_CITIES,
  REGION,
  REGION_NAME,
  GEO,
  url,
} from '@/lib/site'

/**
 * Site-wide structured data graph.
 * - Organization: brand identity (sameAs, logo).
 * - LocalBusiness: a mobile, service-area business (no storefront address)
 *   that serves each Tri-Cities city via `areaServed`.
 * - Service: the actual offering, linked back to the provider.
 */
export function organizationSchema() {
  const areaServed = SERVICE_CITIES.map((city) => ({
    '@type': 'City',
    name: city,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: REGION,
      addressCountry: 'US',
    },
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: {
          '@type': 'ImageObject',
          url: url('/logo.png'),
          width: 1536,
          height: 1024,
        },
        image: url('/van-dogs.jpg'),
        description:
          'WagSpeed is a mobile dog fitness service. A climate-controlled van brings a professional treadmill and an experienced handler to your driveway in the Tri-Cities, WA.',
        // Only emit sameAs when real profiles exist — an empty array is noise.
        ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : null),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : null),
        ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : null),
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        image: url('/van-dogs.jpg'),
        logo: url('/logo.png'),
        priceRange: '$$',
        currenciesAccepted: 'USD',
        description:
          'Mobile dog treadmill service serving Kennewick, Pasco, Richland and the greater Tri-Cities, WA. A professional treadmill workout delivered to your driveway.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kennewick',
          addressRegion: REGION,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        areaServed,
        knowsAbout: [
          'dog fitness',
          'dog treadmill',
          'mobile dog exercise',
          'dog weight loss',
          'canine conditioning',
        ],
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile Dog Treadmill Session',
            serviceType: 'Dog fitness and treadmill conditioning',
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed,
          },
        },
      },
    ],
  }
}

/** FAQPage schema — keyword-rich Q&A that AI search and rich results favor. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
