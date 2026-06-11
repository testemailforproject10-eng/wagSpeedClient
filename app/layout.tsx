import type { Metadata } from 'next'
import { Archivo_Narrow, Hanken_Grotesk } from 'next/font/google'
import './globals.css'

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  variable: '--font-archivo-narrow',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WagSpeed | Professional Dog Fitness',
  description:
    'A mobile van brings a professional treadmill to your driveway so your dog gets a real workout — without you lifting a finger. Coming soon to Tri-Cities, WA.',
  keywords: ['dog fitness', 'dog treadmill', 'mobile dog workout', 'Tri-Cities', 'dog exercise'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.svg',    type: 'image/png' },
    ],
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'WagSpeed | Professional Dog Fitness',
    description: 'Coming soon to the Tri-Cities area. Join the waitlist and secure your launch priority.',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${archivoNarrow.variable} ${hankenGrotesk.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
