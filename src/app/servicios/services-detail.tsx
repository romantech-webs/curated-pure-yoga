import { config } from '@/lib/config'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

const serviceImages: Record<string, string> = {
  'yoga-facial': '/images/services/yoga-facial-jade.webp',
  'kinesiotape-facial': '/images/services/yoga-facial.webp',
  'formacion-yoga-facial': '/images/services/formacion-editorial.webp',
  'certificacion-instructores': '/images/gallery/sala-tratamiento.webp',
  'botox': '/images/services/inyeccion-facial.webp',
  'acido-hialuronico': '/images/services/acido-hialuronico.webp',
  'consulta-integral': '/images/services/masaje-tratamiento.webp',
}

const groups = [
  {
    title: 'Yoga Facial y Bienestar',
    description: 'Técnicas naturales para tonificar, rejuvenecer y cuidar tu rostro desde dentro.',
    ids: ['yoga-facial', 'kinesiotape-facial', 'formacion-yoga-facial', 'certificacion-instructores'],
  },
  {
    title: 'Medicina Estética',
    description: 'Tratamientos médicos personalizados para resultados visibles y naturales.',
    ids: ['botox', 'acido-hialuronico', 'consulta-integral'],
  },
]

export function ServicesDetail() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Tratamientos' },
            ]}
          />
        </div>

        {/* Page header */}
        <div className="text-center mb-20">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-secondary tracking-wide">
            NUESTROS TRATAMIENTOS
          </h1>
          <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
            {config.sectionCopy.servicesDescription}
          </p>
        </div>

        {/* Service groups */}
        {groups.map((group) => {
          const services = group.ids
            .map((id) => config.services.find((s) => s.id === id))
            .filter(Boolean)

          return (
            <div key={group.title} className="mb-20 last:mb-0">
              {/* Group header */}
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-secondary tracking-wide">
                  {group.title.toUpperCase()}
                </h2>
                <p className="mt-3 text-sm text-muted max-w-md mx-auto leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Service cards grid */}
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                {services.map((service) => {
                  const imageSrc = serviceImages[service!.id] || '/images/services/yoga-facial-jade.webp'

                  return (
                    <a
                      key={service!.id}
                      href={`/servicios/${service!.id}/`}
                      className="group overflow-hidden"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={service!.name}
                          className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="mt-5 font-display text-xl font-light text-secondary tracking-wide group-hover:text-accent transition-colors">
                        {service!.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
                        {service!.description}
                      </p>
                      <span className="mt-4 inline-block text-xs tracking-widest uppercase text-secondary border-b border-secondary/30 pb-0.5 group-hover:border-secondary transition-colors">
                        Ver tratamiento
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
