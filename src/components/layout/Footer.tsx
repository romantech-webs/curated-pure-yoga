import { config } from '@/lib/config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#3a3a3a] text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-14 text-center">
        {/* Brand name */}
        <h3 className="font-display text-2xl md:text-3xl font-light text-white tracking-wider uppercase">
          {config.name}
        </h3>

        {/* Contact info */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
          <a
            href={`tel:+34${config.phone.replace(/\s/g, '')}`}
            className="hover:text-white transition-colors"
          >
            +34 {config.phone}
          </a>
          <span className="hidden sm:inline text-white/30">|</span>
          <span>
            {config.address.street}, {config.address.postalCode} {config.address.city}
          </span>
        </div>

        {/* Social */}
        {config.social.instagram && (
          <div className="mt-5">
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        )}

        {/* Nav links */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs tracking-widest uppercase">
          <a href="/servicios/" className="hover:text-white transition-colors">Tratamientos</a>
          <a href="/tienda/" className="hover:text-white transition-colors">Tienda</a>
          <a href="/#testimonios" className="hover:text-white transition-colors">Testimonios</a>
          <a href="/contacto/" className="hover:text-white transition-colors">Contacto</a>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/30">
          <div className="flex gap-4">
            <a href="/privacidad/" className="hover:text-white/50 transition-colors">Política de Privacidad</a>
            <a href="/aviso-legal/" className="hover:text-white/50 transition-colors">Aviso Legal</a>
          </div>
          <span className="hidden sm:inline">·</span>
          <p>&copy; {year} {config.legal.companyName}</p>
        </div>
      </div>
    </footer>
  )
}
