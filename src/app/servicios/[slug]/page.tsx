import type { Metadata } from 'next'
import { config } from '@/lib/config'
import { notFound } from 'next/navigation'
import { ServicePageContent } from './service-page-content'
import { createServiceSchema, createFAQSchema, createBreadcrumbSchema } from '@/lib/schemas'

export function generateStaticParams() {
  return config.services.map((service) => ({
    slug: service.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = config.services.find((s) => s.id === slug)
  if (!service) return {}

  return {
    title: service.metaTitle || `${service.name} en Bilbao`,
    description: service.metaDescription || service.description,
    alternates: {
      canonical: `https://curatedbyac.com/servicios/${service.id}/`,
    },
    openGraph: {
      title: `${service.name} | Curated by AC`,
      description: service.metaDescription || service.description,
      url: `https://curatedbyac.com/servicios/${service.id}/`,
      type: 'website',
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = config.services.find((s) => s.id === slug)
  if (!service) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: Record<string, any>[] = [
    createServiceSchema(service),
    createBreadcrumbSchema([
      { name: 'Inicio', url: '/' },
      { name: 'Tratamientos', url: '/servicios/' },
      { name: service.name, url: `/servicios/${service.id}/` },
    ]),
  ]

  if (service.faq && service.faq.length > 0) {
    schemas.push(createFAQSchema(service.faq))
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicePageContent service={service} />
    </>
  )
}
