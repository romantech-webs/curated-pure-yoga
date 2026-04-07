import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Compra online bonos, tratamientos y packs seleccionados de Curated by AC. Recoge en nuestro centro de Bilbao.',
  alternates: {
    canonical: 'https://curatedbyac.com/tienda/',
  },
}

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return children
}
