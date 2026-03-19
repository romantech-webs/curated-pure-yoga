import type { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Visítanos en nuestro centro de Bilbao. Horario, dirección y cómo contactarnos.',
}

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <CTA />
      <Contact />
    </div>
  )
}
