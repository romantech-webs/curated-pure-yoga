'use client'

import { useState, useEffect } from 'react'
import { config } from '@/lib/config'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartButton } from '@/components/store/CartButton'

const navLinks = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#proceso', label: 'Método' },
  { href: '/#testimonios', label: 'Testimonios' },
  { href: '/#galeria', label: 'Galería' },
  { href: '/tienda/', label: 'Tienda' },
  { href: '/contacto/', label: 'Contacto' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-18 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          {config.logo && (
            <img src={config.logo} alt={config.name} className="h-9 md:h-10 w-auto" />
          )}
          <span className="text-lg font-medium tracking-tight text-secondary">
            {config.name}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <CartButton />
          <a
            href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(config.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            {config.ctaLabel}
          </a>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="lg:hidden flex items-center gap-1">
          <CartButton />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-secondary"
            aria-label="Menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-neutral-dark overflow-hidden"
          >
            <div className="px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-base text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(config.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center bg-primary text-white px-6 py-3 rounded-xl font-medium"
              >
                {config.ctaLabel}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
