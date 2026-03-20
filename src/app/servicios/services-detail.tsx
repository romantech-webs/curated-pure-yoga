'use client'

import { config } from '@/lib/config'
import { getIcon } from '@/lib/icons'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function ServicesDetail() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-secondary tracking-wide">
            NUESTROS TRATAMIENTOS
          </h1>
          <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
            {config.sectionCopy.servicesDescription}
          </p>
        </motion.div>

        {/* Service details */}
        <div className="space-y-8">
          {config.services.map((service) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4 }}
                className="scroll-mt-24 p-8 md:p-10 border border-neutral-dark"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-muted" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-medium text-secondary">{service.name}</h2>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{service.description}</p>
                    {service.benefits.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-center gap-3 text-sm text-secondary">
                            <Check className="w-4 h-4 text-accent shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6">
                      <a
                        href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(`Hola, me interesa el servicio de ${service.name}. ¿Podrían darme más información?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-secondary text-secondary text-xs tracking-widest uppercase px-8 py-3 hover:bg-secondary hover:text-white transition-all duration-300"
                      >
                        Consultar
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
