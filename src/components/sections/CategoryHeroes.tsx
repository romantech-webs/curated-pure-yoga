interface CategoryBlock {
  title: string
  description: string
  image: string
  cta: string
  href: string
  align?: 'left' | 'center'
}

const categories: CategoryBlock[] = [
  {
    title: 'TIENDA',
    description: 'Compra nuestros bonos, tratamientos y packs al mejor precio.',
    image: '/images/services/acido-hialuronico.webp',
    cta: '¡Haz tu compra!',
    href: '/tienda/',
    align: 'left',
  },
  {
    title: 'YOGA FACIAL',
    description: 'Descubre nuestro método exclusivo de rejuvenecimiento facial natural.',
    image: '/images/services/yoga-facial.webp',
    cta: '¡Descúbrelo!',
    href: '/#tratamientos',
    align: 'left',
  },
  {
    title: 'MEDICINA ESTÉTICA',
    description: 'Descubre la medicina estética más natural y personalizada.',
    image: '/images/services/inyeccion-facial.webp',
    cta: 'Ver tratamientos',
    href: '/#tratamientos',
    align: 'center',
  },
  {
    title: 'FORMACIÓN',
    description: 'Conviértete en instructora certificada de yoga facial.',
    image: '/images/services/masaje-tratamiento.webp',
    cta: 'Más información',
    href: '/servicios/',
    align: 'left',
  },
]

export function CategoryHeroes() {
  return (
    <section id="tratamientos">
      {categories.map((cat) => (
        <div
          key={cat.title}
          className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-neutral-dark">
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 ${
              cat.align === 'center'
                ? 'bg-white/70'
                : 'bg-gradient-to-r from-white/85 via-white/60 to-transparent'
            }`} />
          </div>

          {/* Content */}
          <div className={`relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 ${
            cat.align === 'center' ? 'text-center' : ''
          }`}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-wide">
              {cat.title}
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted max-w-md leading-relaxed"
              style={cat.align === 'center' ? { margin: '12px auto 0' } : undefined}
            >
              {cat.description}
            </p>
            <div className={`mt-6 ${cat.align === 'center' ? 'flex justify-center' : ''}`}>
              <a
                href={cat.href}
                className="inline-block border border-secondary text-secondary text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-all duration-300"
              >
                {cat.cta}
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
