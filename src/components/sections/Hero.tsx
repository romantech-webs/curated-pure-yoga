'use client'

import { config } from '@/lib/config'

export function Hero() {
  return (
    <section className="relative h-[45vh] md:h-[55vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-secondary">
        <img
          src="/images/hero-editorial.webp"
          alt={config.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16">
        <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-3">
          {config.specialty}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-wide italic">
          {config.heroHeadline[0]}
          <br />
          {config.heroHeadline[1]}
        </h1>
        <p className="mt-4 text-sm text-white/70 max-w-md leading-relaxed">
          {config.heroDescription}
        </p>
        <div className="mt-8">
          <a
            href="/#tratamientos"
            className="inline-block border border-white text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-white hover:text-secondary transition-all duration-300"
          >
            Descubrir
          </a>
        </div>
      </div>
    </section>
  )
}
