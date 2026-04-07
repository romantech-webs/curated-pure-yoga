import { Check } from 'lucide-react'

const reasons = [
  'Atención médica experta y cercana',
  'Enfoque ético, sin sobrecorrecciones',
  'Resultados visibles, naturales y armoniosos',
  'Método propio que combina yoga facial y medicina estética',
  'Primera consulta totalmente gratuita',
]

export function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-neutral">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Centered header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-secondary tracking-wide">
            MEDICINA ESTÉTICA
          </h2>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-lg mx-auto">
            Descubre la medicina estética más natural y personalizada.
          </p>
          <p className="mt-2 text-xs text-muted leading-relaxed max-w-md mx-auto">
            Protocolos exclusivos, resultados visibles y un enfoque ético
            basado en el cuidado real de tu piel.
          </p>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-medium text-secondary italic">
              ¿Por qué elegir Curated by AC?
            </p>
            <ul className="mt-5 space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-muted leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="/servicios/"
                className="inline-block bg-secondary text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary/90 transition-all duration-300"
              >
                Conoce nuestros tratamientos
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden order-first lg:order-last">
            <img
              src="/images/services/medicina-estetica.webp"
              alt="Medicina estética en Bilbao"
              className="w-full h-[300px] md:h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
