'use client'

import { useState } from 'react'
import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return
    const next = (lightbox + dir + config.gallery.length) % config.gallery.length
    setLightbox(next)
  }

  return (
    <section id="galeria" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.galleryLabel}
          title={config.sectionCopy.galleryTitle}
          description={config.sectionCopy.galleryDescription}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {config.gallery.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => setLightbox(i)}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              src={config.gallery[lightbox].src}
              alt={config.gallery[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
