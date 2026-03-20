'use client'

import { config } from '@/lib/config'

export function Hero() {
  return (
    <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-secondary">
        <img
          src="/images/services/yoga-facial.webp"
          alt={config.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 animate-fade-up">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-wide">
          {config.heroHeadline[0]}
          <br />
          <span className="italic">{config.heroHeadline[1]}</span>
        </h1>

        <p className="mt-6 text-sm md:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
          {config.heroDescription}
        </p>

        <div className="mt-10">
          <a
            href="/#tratamientos"
            className="inline-block bg-secondary text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-secondary/80 transition-colors duration-300"
          >
            Conoce nuestros tratamientos
          </a>
        </div>
      </div>
    </section>
  )
}
