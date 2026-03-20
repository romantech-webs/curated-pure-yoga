'use client'

import { config } from '@/lib/config'
import { MapPin, Phone, Clock } from 'lucide-react'

export function Contact() {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-neutral">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-center text-secondary tracking-wide mb-12">
          VISÍTANOS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map */}
          <div className="lg:col-span-3 overflow-hidden h-80 md:h-[420px]">
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
          </div>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-muted mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-secondary uppercase tracking-wider">Dirección</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {config.address.street}<br />
                    {config.address.postalCode} {config.address.city}, {config.address.province}
                  </p>
                  <a
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-secondary underline hover:no-underline"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-muted mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-secondary uppercase tracking-wider">Teléfono</h3>
                  <a href={`tel:+34${config.phone.replace(/\s/g, '')}`} className="mt-1 text-sm text-muted hover:text-secondary transition-colors">
                    {config.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-muted mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-secondary uppercase tracking-wider">Horario</h3>
                  <ul className="mt-1 space-y-1">
                    {config.schedule.map((entry, i) => (
                      <li key={i} className="text-sm text-muted">
                        <span className="text-secondary/80">{entry.days}:</span> {entry.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
