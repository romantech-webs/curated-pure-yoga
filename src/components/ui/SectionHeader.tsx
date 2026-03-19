'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeader({ label, title, description, centered = true, light = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      <span className={`text-sm font-medium tracking-[0.2em] uppercase ${light ? 'text-primary-light' : 'text-primary'}`}>
        {label}
      </span>
      <h2 className={`mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-tight tracking-tight ${light ? 'text-white' : 'text-secondary'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
