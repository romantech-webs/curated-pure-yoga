interface CategoryCard {
  title: string
  description: string
  image: string
  cta: string
  href: string
}

const categories: CategoryCard[] = [
  {
    title: 'TRATAMIENTOS',
    description: 'Facial, corporal y relax. Descubre cuál es el mejor tratamiento para ti.',
    image: '/images/services/yoga-facial-jade.webp',
    cta: '¡Descúbrelos!',
    href: '/servicios/',
  },
  {
    title: 'RESERVAS',
    description: 'Agenda una cita para disfrutar de la mejor experiencia.',
    image: '/images/gallery/sala-tratamiento.webp',
    cta: '¡Reserva!',
    href: '/contacto/',
  },
  {
    title: 'TIENDA',
    description: 'Compra cualquiera de nuestros productos y recíbelos en casa.',
    image: '/images/services/masaje-tratamiento.webp',
    cta: '¡Haz tu compra!',
    href: '/tienda/',
  },
  {
    title: 'NOVIAS',
    description: 'Los mejores tratamientos de belleza para novias, madrinas e invitadas.',
    image: '/images/services/medicina-estetica.webp',
    cta: '¡Descúbrelo!',
    href: '/servicios/',
  },
  {
    title: 'FORMACIÓN',
    description: 'Conviértete en instructora certificada de yoga facial.',
    image: '/images/gallery/brand-wall.webp',
    cta: 'Más información',
    href: '/servicios/',
  },
]

export function CategoryGrid() {
  return (
    <section id="tratamientos" className="py-12 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Desktop: grid layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <a
              key={cat.title}
              href={cat.href}
              className={`group relative overflow-hidden ${
                i === 0 ? 'row-span-2 min-h-[440px]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h3 className="font-display text-xl font-medium text-white tracking-wider">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  {cat.description}
                </p>
                <span className="mt-3 inline-block text-xs tracking-widest uppercase text-white border-b border-white/50 pb-0.5 self-start group-hover:border-white transition-colors">
                  {cat.cta}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile: full-width stacked blocks */}
        <div className="flex flex-col md:hidden gap-4">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden h-[220px]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex flex-col justify-center px-6">
                <h3 className="font-display text-2xl font-medium text-white tracking-wider">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-xs">
                  {cat.description}
                </p>
                <div className="mt-4">
                  <span className="inline-block border border-white/70 text-white text-xs tracking-widest uppercase px-6 py-2.5">
                    {cat.cta}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
