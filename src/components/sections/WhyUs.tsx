'use client'

import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getIcon } from '@/lib/icons'
import { motion } from 'framer-motion'

export function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-neutral">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.whyUsLabel}
          title={config.sectionCopy.whyUsTitle}
          description={config.sectionCopy.whyUsDescription}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {config.whyUs.map((item, i) => {
            const Icon = getIcon(item.icon)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-medium text-secondary">{item.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
