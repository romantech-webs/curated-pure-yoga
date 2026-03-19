import type { Metadata } from 'next'
import { config } from '@/lib/config'
import { ServicesDetail } from './services-detail'

export const metadata: Metadata = {
  title: 'Servicios',
  description: `Servicios de ${config.name}: ${config.services.map(s => s.name).join(', ')}.`,
}

export default function ServiciosPage() {
  return <ServicesDetail />
}
