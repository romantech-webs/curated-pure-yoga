'use client'

import { config } from '@/lib/config'

export function Hero() {
  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-end pb-12 md:items-center md:pb-0 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/gallery/recepcion-curated.webp"
          alt={config.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-16 pt-20 md:pt-0">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-secondary/70 mb-3 font-medium">
          Tratamientos
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-secondary leading-tight tracking-wide italic">
          {config.heroHeadline[0]}
          <br />
          {config.heroHeadline[1]}
        </h1>
        <p className="mt-4 text-sm text-secondary/60 max-w-md leading-relaxed hidden sm:block">
          Conoce todos nuestros tratamientos y descubre cuál es el mejor para ti o solicita un diagnóstico gratuito.
        </p>
        <div className="mt-8">
          <a
            href="/#tratamientos"
            className="inline-block border border-secondary text-secondary text-[10px] md:text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Descubrir
          </a>
        </div>
      </div>
    </section>
  )
}
