'use client'

import { config } from '@/lib/config'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary-light">
            {config.name}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
            {config.ctaHeadline}
          </h2>
          <p className="mt-4 text-base text-white/60 max-w-lg mx-auto leading-relaxed">
            {config.ctaDescription}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(config.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#20bd5a] transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={`tel:+34${config.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              {config.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
