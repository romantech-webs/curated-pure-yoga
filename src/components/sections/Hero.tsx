'use client'

import { config } from '@/lib/config'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Star, ArrowDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/gallery/photo-0.webp"
          alt={config.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-8"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.round(config.reviews.rating) ? 'text-accent fill-accent' : 'text-neutral-dark'}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted">
              {config.reviews.rating} / 5 &middot; {config.reviews.count}+ reseñas
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-secondary"
          >
            {config.heroHeadline.map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="text-primary">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-lg"
          >
            {config.heroDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(config.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              {config.ctaLabel}
            </Button>
            <Button href="/#servicios" variant="outline" size="lg">
              Nuestros servicios
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="/#servicios" className="flex flex-col items-center gap-2 text-muted/50 hover:text-primary transition-colors">
          <span className="text-xs tracking-wider uppercase">Descubre</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
