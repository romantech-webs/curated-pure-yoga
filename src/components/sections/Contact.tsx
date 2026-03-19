'use client'

import { config } from '@/lib/config'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export function Contact() {
  return (
    <section id="contacto" className="py-20 md:py-28 bg-neutral">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label={config.sectionCopy.locationLabel}
          title={config.sectionCopy.locationTitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-sm h-80 md:h-96"
          >
            <iframe
              src={config.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary">Dirección</h3>
                  <p className="mt-1 text-sm text-muted">
                    {config.address.street}<br />
                    {config.address.postalCode} {config.address.city}, {config.address.province}
                  </p>
                  <a
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary">Teléfono</h3>
                  <a href={`tel:+34${config.phone.replace(/\s/g, '')}`} className="mt-1 text-sm text-muted hover:text-primary transition-colors">
                    {config.phone}
                  </a>
                </div>
              </div>

              {config.email && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-secondary">Email</h3>
                    <a href={`mailto:${config.email}`} className="mt-1 text-sm text-muted hover:text-primary transition-colors">
                      {config.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary">Horario</h3>
                  <ul className="mt-1 space-y-1">
                    {config.schedule.map((entry, i) => (
                      <li key={i} className="text-sm text-muted">
                        <span className="font-medium text-secondary/80">{entry.days}:</span> {entry.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
