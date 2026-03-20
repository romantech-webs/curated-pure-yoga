import { config } from '@/lib/config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16">
        {/* Logo + tagline */}
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-light text-white tracking-wider uppercase">
            {config.name}
          </h3>
          <p className="mt-2 text-sm text-white/50">
            {config.tagline}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 text-xs tracking-widest uppercase">
          <a href="/#tratamientos" className="hover:text-white transition-colors">Tratamientos</a>
          <a href="/tienda/" className="hover:text-white transition-colors">Tienda</a>
          <a href="/#testimonios" className="hover:text-white transition-colors">Testimonios</a>
          <a href="/contacto/" className="hover:text-white transition-colors">Contacto</a>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm">
          <span>{config.address.street}, {config.address.postalCode} {config.address.city}</span>
          <a href={`tel:+34${config.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
            {config.phone}
          </a>
        </div>

        {/* Separator */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex gap-6">
            <a href="/privacidad/" className="hover:text-white/50 transition-colors">Política de Privacidad</a>
            <a href="/aviso-legal/" className="hover:text-white/50 transition-colors">Aviso Legal</a>
          </div>
          <p>&copy; {year} {config.legal.companyName}</p>
          <p>
            Web diseñada por{' '}
            <a href="https://romantechwebs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">
              RomanTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
