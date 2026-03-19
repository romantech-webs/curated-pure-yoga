'use client'

import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getIcon } from '@/lib/icons'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.servicesLabel}
          title={config.sectionCopy.servicesTitle}
          description={config.sectionCopy.servicesDescription}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.a
                key={service.id}
                href={`/servicios/#${service.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative p-7 md:p-8 rounded-2xl bg-neutral hover:bg-white border border-transparent hover:border-neutral-dark hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-secondary group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="text-xs px-3 py-1 rounded-full bg-white border border-neutral-dark text-muted"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
