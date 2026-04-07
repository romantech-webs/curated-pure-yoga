import type { Metadata } from 'next'
import { createBreadcrumbSchema } from '@/lib/schemas'
import { ServicesDetail } from './services-detail'

export const metadata: Metadata = {
  title: 'Tratamientos de Medicina Estética y Yoga Facial',
  description: 'Descubre todos los tratamientos de Curated by AC en Bilbao: yoga facial, kinesiotape facial, botox, ácido hialurónico y más. Resultados naturales y personalizados.',
  alternates: {
    canonical: 'https://curatedbyac.com/servicios/',
  },
}

export default function ServiciosPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Tratamientos', url: '/servicios/' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesDetail />
    </>
  )
}
