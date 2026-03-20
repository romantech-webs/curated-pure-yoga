import { Check } from 'lucide-react'

const reasons = [
  'Método propio que combina yoga facial y medicina estética',
  'Experiencia médica certificada y enfoque holístico',
  'Resultados naturales y armoniosos, sin sobrecorrecciones',
  'Primera consulta personalizada gratuita',
]

export function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image — shown first on mobile */}
          <div className="overflow-hidden lg:hidden">
            <img
              src="/images/services/medicina-estetica.webp"
              alt="Medicina estética"
              className="w-full h-[250px] object-cover"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-secondary tracking-wide">
              MEDICINA ESTÉTICA
            </h2>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Descubre la medicina estética más natural y personalizada.
              Protocolos exclusivos, resultados visibles y un enfoque ético
              basado en el cuidado real de tu piel.
            </p>

            <div className="mt-8">
              <p className="text-sm font-medium text-secondary">
                ¿Por qué elegir Curated?
              </p>
              <ul className="mt-4 space-y-3">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-muted leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href="/servicios/"
                className="inline-block border border-secondary text-secondary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-all duration-300"
              >
                Conoce nuestros tratamientos
              </a>
            </div>
          </div>

          {/* Image — desktop only (mobile shown above) */}
          <div className="hidden lg:block overflow-hidden">
            <img
              src="/images/services/medicina-estetica.webp"
              alt="Medicina estética"
              className="w-full h-[450px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
