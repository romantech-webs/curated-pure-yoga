import { config } from '@/lib/config'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white/80">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-medium text-white tracking-tight">{config.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {config.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-light shrink-0" />
                <span>{config.address.street}, {config.address.postalCode} {config.address.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-light shrink-0" />
                <a href={`tel:+34${config.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {config.phone}
                </a>
              </li>
              {config.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary-light shrink-0" />
                  <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">
                    {config.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Horario</h4>
            <ul className="space-y-2 text-sm">
              {config.schedule.map((entry, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary-light shrink-0" />
                  <span>
                    <strong className="text-white/90">{entry.days}:</strong> {entry.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacidad/" className="hover:text-white transition-colors">Política de Privacidad</a>
              </li>
              <li>
                <a href="/aviso-legal/" className="hover:text-white transition-colors">Aviso Legal</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {year} {config.legal.companyName}. Todos los derechos reservados.</p>
          <p>
            Web diseñada por{' '}
            <a href="https://romantechwebs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              RomanTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
