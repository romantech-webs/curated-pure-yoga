'use client'

import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export function Reviews() {
  return (
    <section id="testimonios" className="py-20 md:py-28 bg-neutral">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.reviewsLabel}
          title={config.sectionCopy.reviewsTitle}
        />

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(config.reviews.rating) ? 'text-accent fill-accent' : 'text-neutral-dark'}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted">
            <strong className="text-secondary">{config.reviews.rating}</strong> de 5 basado en{' '}
            <a
              href={config.reviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {config.reviews.count}+ reseñas en Google
            </a>
          </p>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.reviews.featured.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-7 rounded-2xl shadow-sm"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-muted leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">{review.author}</p>
                  <p className="text-xs text-muted">{review.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
