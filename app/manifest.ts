import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Mobile Dog Treadmill Service`,
    short_name: SITE_NAME,
    description:
      'A mobile van brings a professional dog treadmill and an experienced handler to your driveway in the Tri-Cities, WA.',
    start_url: '/',
    display: 'standalone',
    background_color: '#101418',
    theme_color: '#101418',
    categories: ['pets', 'health', 'fitness', 'lifestyle'],
    icons: [
      { src: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/logo.png', type: 'image/png', sizes: '1536x1024' },
    ],
  }
}
