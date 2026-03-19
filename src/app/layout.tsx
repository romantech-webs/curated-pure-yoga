import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { config } from '@/lib/config'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: config.seo.defaultTitle,
    template: config.seo.titleTemplate,
  },
  description: config.seo.defaultDescription,
  keywords: config.seo.keywords,
  openGraph: {
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    url: 'https://curatedbyac.com',
    siteName: config.name,
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://curatedbyac.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': config.schemaType,
    name: config.name,
    description: config.description,
    url: 'https://curatedbyac.com',
    telephone: `+34${config.phone.replace(/\s/g, '')}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.province,
      postalCode: config.address.postalCode,
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.coordinates.lat,
      longitude: config.coordinates.lng,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: config.reviews.rating,
      reviewCount: config.reviews.count,
      bestRating: 5,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
    ],
  }

  return (
    <html lang="es" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
