import { config } from '@/lib/config'

const BASE_URL = 'https://curatedbyac.com'

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

export function createServiceSchema(service: (typeof config.services)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.longDescription || service.description,
    url: `${BASE_URL}/servicios/${service.id}/`,
    provider: {
      '@type': 'HealthAndBeautyBusiness',
      '@id': `${BASE_URL}/#organization`,
      name: 'Curated by AC',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bilbao',
    },
  }
}

export function createFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function createWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Curated by AC',
    url: BASE_URL,
    publisher: {
      '@type': 'HealthAndBeautyBusiness',
      '@id': `${BASE_URL}/#organization`,
    },
  }
}
