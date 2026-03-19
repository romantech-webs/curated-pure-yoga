'use client'

import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { motion } from 'framer-motion'

export function Team() {
  if (!config.team.length) return null

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.teamLabel}
          title={config.sectionCopy.teamTitle}
          description={config.sectionCopy.teamDescription}
        />

        <div className="max-w-3xl mx-auto">
          {config.team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-light text-secondary">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-4 text-sm text-muted leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
