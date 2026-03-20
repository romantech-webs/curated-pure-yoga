'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  label?: string
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
      {label && (
        <span className={`text-xs tracking-widest uppercase ${light ? 'text-white/60' : 'text-muted'}`}>
          {label}
        </span>
      )}
      <h2 className={`${label ? 'mt-3' : ''} font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-wide ${light ? 'text-white' : 'text-secondary'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-sm md:text-base max-w-lg leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
