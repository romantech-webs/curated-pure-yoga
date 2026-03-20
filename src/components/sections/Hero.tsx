'use client'

import { config } from '@/lib/config'

export function Hero() {
  return (
    <section className="relative min-h-[65vh] md:min-h-[55vh] flex items-end pb-12 md:items-center md:pb-0 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-secondary">
        <img
          src="/images/hero-skin.webp"
          alt={config.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-16 pt-20 md:pt-0">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 mb-2 md:mb-3">
          {config.specialty}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-light text-white leading-tight tracking-wide italic">
          {config.heroHeadline[0]}
          <br />
          {config.heroHeadline[1]}
        </h1>
        <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/70 max-w-md leading-relaxed hidden sm:block">
          {config.heroDescription}
        </p>
        <div className="mt-6 md:mt-8">
          <a
            href="/#tratamientos"
            className="inline-block border border-white text-white text-[10px] md:text-xs tracking-widest uppercase px-6 md:px-8 py-3 md:py-3.5 hover:bg-white hover:text-secondary transition-all duration-300"
          >
            Descubrir
          </a>
        </div>
      </div>
    </section>
  )
}
