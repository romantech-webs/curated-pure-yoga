'use client'

import { useState } from 'react'
import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.faqLabel}
          title={config.sectionCopy.faqTitle}
          description={config.sectionCopy.faqDescription}
        />

        <div className="space-y-3">
          {config.faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-neutral-dark overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-neutral/50 transition-colors"
              >
                <span className="text-sm md:text-base font-medium text-secondary pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
