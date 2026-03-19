import type { Metadata } from 'next'
import { config } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-5 md:px-8 prose prose-sm prose-gray">
        <h1 className="text-3xl font-light text-secondary">Política de Privacidad</h1>
        <p className="text-muted text-sm">Última actualización: marzo 2026</p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          <strong>{config.legal.companyName}</strong><br />
          {config.legal.registeredAddress}
          {config.legal.cif && <><br />CIF: {config.legal.cif}</>}
        </p>

        <h2>2. Datos que recopilamos</h2>
        <p>
          Únicamente recopilamos los datos personales que nos proporcionas voluntariamente
          al contactarnos a través de WhatsApp, teléfono o formulario de contacto: nombre,
          teléfono y, en su caso, correo electrónico.
        </p>

        <h2>3. Finalidad del tratamiento</h2>
        <ul>
          <li>Gestionar tus consultas y solicitudes de información</li>
          <li>Programar y gestionar citas</li>
          <li>Enviarte comunicaciones relacionadas con nuestros servicios si das tu consentimiento</li>
        </ul>

        <h2>4. Base legal</h2>
        <p>
          El tratamiento se basa en tu consentimiento expreso y en la ejecución de la
          relación contractual o precontractual.
        </p>

        <h2>5. Conservación</h2>
        <p>
          Los datos se conservarán mientras se mantenga la relación comercial y durante
          los plazos legalmente establecidos.
        </p>

        <h2>6. Derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad,
          limitación y oposición contactándonos en el teléfono {config.phone}.
        </p>

        <h2>7. Cookies</h2>
        <p>
          Este sitio web no utiliza cookies de terceros ni herramientas de tracking.
        </p>
      </div>
    </div>
  )
}
