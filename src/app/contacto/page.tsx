import type { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Visítanos en nuestro centro de medicina estética en Bilbao. Dirección, horario y cómo contactarnos.',
  alternates: {
    canonical: 'https://curatedbyac.com/contacto/',
  },
}

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  )
}
