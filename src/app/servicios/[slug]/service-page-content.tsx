'use client'

import { useState } from 'react'
import { config } from '@/lib/config'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Check, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const serviceImages: Record<string, string> = {
  'yoga-facial': '/images/services/yoga-facial-jade.webp',
  'kinesiotape-facial': '/images/services/yoga-facial.webp',
  'formacion-yoga-facial': '/images/services/formacion-editorial.webp',
  'certificacion-instructores': '/images/gallery/sala-tratamiento.webp',
  'botox': '/images/services/inyeccion-facial.webp',
  'acido-hialuronico': '/images/services/acido-hialuronico.webp',
  'consulta-integral': '/images/services/masaje-tratamiento.webp',
}

const categoryMap: Record<string, string[]> = {
  'yoga-facial': ['yoga-facial', 'kinesiotape-facial', 'formacion-yoga-facial', 'certificacion-instructores'],
  'medicina-estetica': ['botox', 'acido-hialuronico', 'consulta-integral'],
}

function getRelatedServices(currentId: string) {
  const category = Object.entries(categoryMap).find(([, ids]) => ids.includes(currentId))
  if (!category) return []
  const related = category[1].filter((id) => id !== currentId)
  const otherCategory = Object.entries(categoryMap).find(([key]) => key !== category[0])
  if (otherCategory && related.length < 2) {
    related.push(otherCategory[1][0])
  }
  return related
    .slice(0, 3)
    .map((id) => config.services.find((s) => s.id === id))
    .filter(Boolean)
}

interface ServicePageContentProps {
  service: (typeof config.services)[number]
}

export function ServicePageContent({ service }: ServicePageContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const imageSrc = serviceImages[service.id] || '/images/services/yoga-facial-jade.webp'
  const relatedServices = getRelatedServices(service.id)

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Tratamientos', href: '/servicios/' },
              { label: service.name },
            ]}
          />
        </div>

        {/* Hero section */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
          <div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-secondary tracking-wide">
              {service.name.toUpperCase()}
            </h1>
            <p className="mt-5 text-sm text-muted leading-relaxed">
              {service.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {service.benefits.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(`Hola, me interesa el tratamiento de ${service.name}. ¿Podrían darme más información?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary/90 transition-all duration-300"
              >
                Pedir cita
              </a>
            </div>
          </div>
          <div className="overflow-hidden">
            <img
              src={imageSrc}
              alt={service.name}
              className="w-full h-[300px] md:h-[420px] object-cover"
            />
          </div>
        </div>

        {/* Long description */}
        {service.longDescription && (
          <div className="max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="prose prose-sm text-muted leading-relaxed space-y-4">
              {service.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* FAQ accordion */}
        {service.faq && service.faq.length > 0 && (
          <div className="max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="font-display text-2xl md:text-3xl font-light text-secondary tracking-wide text-center mb-10">
              PREGUNTAS FRECUENTES
            </h2>
            <div className="space-y-3">
              {service.faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-dark overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-neutral/50 transition-colors"
                  >
                    <span className="text-sm md:text-base font-medium text-secondary pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted shrink-0 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA section */}
        <div className="text-center mb-16 md:mb-20 py-12 bg-neutral rounded-2xl">
          <h2 className="font-display text-2xl md:text-3xl font-light text-secondary tracking-wide">
            {config.ctaHeadline.toUpperCase()}
          </h2>
          <p className="mt-3 text-sm text-muted max-w-md mx-auto leading-relaxed">
            {config.ctaDescription}
          </p>
          <div className="mt-6">
            <a
              href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(`Hola, me interesa el tratamiento de ${service.name}. ¿Podrían darme más información?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-secondary/90 transition-all duration-300"
            >
              {config.ctaLabel}
            </a>
          </div>
        </div>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-secondary tracking-wide text-center mb-10">
              OTROS TRATAMIENTOS
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related) => {
                const relatedImage = serviceImages[related!.id] || '/images/services/yoga-facial-jade.webp'
                return (
                  <a
                    key={related!.id}
                    href={`/servicios/${related!.id}/`}
                    className="group overflow-hidden"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={relatedImage}
                        alt={related!.name}
                        className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-light text-secondary tracking-wide group-hover:text-accent transition-colors">
                      {related!.name}
                    </h3>
                    <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-2">
                      {related!.description}
                    </p>
                    <span className="mt-3 inline-block text-xs tracking-widest uppercase text-secondary border-b border-secondary/30 pb-0.5 group-hover:border-secondary transition-colors">
                      Ver tratamiento
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
