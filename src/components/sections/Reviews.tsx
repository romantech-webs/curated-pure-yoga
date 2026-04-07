'use client'

import { config } from '@/lib/config'
import { Star, Quote } from 'lucide-react'

export function Reviews() {
  return (
    <section id="testimonios" className="py-16 md:py-24 bg-neutral">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-secondary tracking-wide">
            LO QUE DICEN NUESTRAS CLIENTAS
          </h2>

          {/* Rating summary */}
          <div className="mt-5 mb-12">
            <div className="inline-flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(config.reviews.rating) ? 'text-accent fill-accent' : 'text-neutral-dark'}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted">
              <strong className="text-secondary">{config.reviews.rating}</strong> de 5 &middot;{' '}
              <a
                href={config.reviews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-secondary transition-colors"
              >
                {config.reviews.count}+ reseñas en Google
              </a>
            </p>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {config.reviews.featured.map((review, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-neutral-dark"
            >
              <Quote className="w-5 h-5 text-neutral-dark mb-3" />
              <p className="text-sm text-muted leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">{review.author}</p>
                  <p className="text-xs text-muted">{review.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 text-accent fill-accent" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
