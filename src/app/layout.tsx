import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import { config } from '@/lib/config'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/components/store/CartProvider'
import { CartDrawer } from '@/components/store/CartDrawer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-display',
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
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': config.schemaType,
    '@id': 'https://curatedbyac.com/#organization',
    name: config.name,
    description: config.description,
    url: 'https://curatedbyac.com',
    telephone: `+34${config.phone.replace(/\s/g, '')}`,
    image: 'https://curatedbyac.com/images/hero-skin.webp',
    logo: {
      '@type': 'ImageObject',
      url: 'https://curatedbyac.com/images/logo.png',
    },
    founder: {
      '@type': 'Person',
      name: config.team[0]?.name,
      jobTitle: config.team[0]?.role,
    },
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
    priceRange: '€€',
    areaServed: {
      '@type': 'City',
      name: 'Bilbao',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tratamientos',
      itemListElement: config.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          url: `https://curatedbyac.com/servicios/${s.id}/`,
        },
      })),
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Curated by AC',
    url: 'https://curatedbyac.com',
    publisher: {
      '@type': 'HealthAndBeautyBusiness',
      '@id': 'https://curatedbyac.com/#organization',
    },
  }

  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  )
}
