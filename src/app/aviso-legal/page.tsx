import type { Metadata } from 'next'
import { config } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-5 md:px-8 prose prose-sm prose-gray">
        <h1 className="text-3xl font-light text-secondary">Aviso Legal</h1>
        <p className="text-muted text-sm">Última actualización: marzo 2026</p>

        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002 de Servicios de la
          Sociedad de la Información y Comercio Electrónico (LSSICE):
        </p>
        <ul>
          <li><strong>Titular:</strong> {config.legal.companyName}</li>
          <li><strong>Domicilio:</strong> {config.legal.registeredAddress}</li>
          {config.legal.cif && <li><strong>CIF:</strong> {config.legal.cif}</li>}
          <li><strong>Teléfono:</strong> {config.phone}</li>
          <li><strong>Sitio web:</strong> curatedbyac.com</li>
        </ul>

        <h2>2. Objeto</h2>
        <p>
          Este sitio web tiene como finalidad informar sobre los servicios ofrecidos por
          {' '}{config.name}, centro especializado en {config.specialty.toLowerCase()}.
        </p>

        <h2>3. Propiedad intelectual</h2>
        <p>
          Todos los contenidos de este sitio web (textos, imágenes, diseño gráfico,
          código fuente) son propiedad de {config.legal.companyName} o de sus
          legítimos titulares, y están protegidos por las leyes de propiedad intelectual.
        </p>

        <h2>4. Limitación de responsabilidad</h2>
        <p>
          {config.legal.companyName} no se responsabiliza de los posibles daños o
          perjuicios derivados de interferencias, omisiones, interrupciones o fallos
          informáticos que se produzcan fuera de su control.
        </p>

        <h2>5. Legislación aplicable</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para la
          resolución de cualquier controversia serán competentes los juzgados y
          tribunales de Bilbao.
        </p>
      </div>
    </div>
  )
}
