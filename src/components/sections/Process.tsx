'use client'

import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getIcon } from '@/lib/icons'
import { motion } from 'framer-motion'

export function Process() {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.processLabel}
          title={config.sectionCopy.processTitle}
          description={config.sectionCopy.processDescription}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {config.process.map((step, i) => {
            const Icon = step.icon ? getIcon(step.icon) : null
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {i < config.process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-neutral-dark" />
                )}

                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      {Icon ? (
                        <Icon className="w-6 h-6 text-primary" />
                      ) : (
                        <span className="text-lg font-medium text-primary">{step.step}</span>
                      )}
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-medium flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-medium text-secondary">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
