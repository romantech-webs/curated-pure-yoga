'use client'

import { config } from '@/lib/config'
import { getIcon } from '@/lib/icons'
import { Button } from '@/components/ui/Button'
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
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {config.sectionCopy.servicesLabel}
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-light text-secondary">
            {config.sectionCopy.servicesTitle}
          </h1>
          <p className="mt-4 text-base text-muted max-w-2xl mx-auto">
            {config.sectionCopy.servicesDescription}
          </p>
        </motion.div>

        {/* Service details */}
        <div className="space-y-12">
          {config.services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="scroll-mt-24 p-8 md:p-10 rounded-2xl bg-neutral"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-light text-secondary">{service.name}</h2>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{service.description}</p>
                    {service.benefits.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-center gap-3 text-sm text-secondary">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6">
                      <Button
                        href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(`Hola, me interesa el servicio de ${service.name}. ¿Podrían darme más información?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                      >
                        Consultar sobre {service.name}
                      </Button>
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
