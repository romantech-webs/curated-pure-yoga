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
    description: 'Yoga facial, kinesiotape y medicina estética.',
    image: '/images/services/yoga-facial-jade.webp',
    cta: 'Descúbrelos',
    href: '/servicios/',
  },
  {
    title: 'TIENDA',
    description: 'Bonos, tratamientos y packs al mejor precio.',
    image: '/images/services/masaje-tratamiento.webp',
    cta: 'Haz tu compra',
    href: '/tienda/',
  },
  {
    title: 'MEDICINA ESTÉTICA',
    description: 'Botox, ácido hialurónico y más.',
    image: '/images/services/medicina-estetica.webp',
    cta: 'Ver tratamientos',
    href: '/servicios/',
  },
  {
    title: 'FORMACIÓN',
    description: 'Certifícate como instructora de yoga facial.',
    image: '/images/gallery/brand-wall.webp',
    cta: 'Más información',
    href: '/servicios/',
  },
  {
    title: 'RESERVAS',
    description: 'Agenda tu cita y disfruta de la mejor experiencia.',
    image: '/images/gallery/sala-tratamiento.webp',
    cta: 'Reserva',
    href: '/contacto/',
  },
]

export function CategoryGrid() {
  return (
    <section id="tratamientos" className="py-12 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Mobile: scroll horizontal. Desktop: grid */}
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

        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="group relative shrink-0 w-[70vw] aspect-[3/4] snap-start overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex flex-col justify-end p-5">
                <h3 className="font-display text-xl font-medium text-white tracking-wider">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  {cat.description}
                </p>
                <span className="mt-3 inline-block text-[10px] tracking-widest uppercase text-white border-b border-white/50 pb-0.5 self-start">
                  {cat.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
