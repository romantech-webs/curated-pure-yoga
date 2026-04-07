'use client'

import { useState, useEffect } from 'react'
import { config } from '@/lib/config'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartButton } from '@/components/store/CartButton'

const navLinks = [
  { href: '/servicios/', label: 'Tratamientos' },
  { href: '/tienda/', label: 'Tienda' },
  { href: '/#testimonios', label: 'Testimonios' },
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
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-neutral-dark/50' : 'bg-white'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-16 md:h-18">
        {/* Left: hamburger (mobile) + nav links (desktop) */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1 text-secondary"
            aria-label="Menú"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-muted hover:text-secondary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Center: logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          {config.logo ? (
            <img src={config.logo} alt={config.name} className="h-10 md:h-11 w-auto" />
          ) : (
            <span className="font-display text-2xl md:text-3xl font-light tracking-wider uppercase text-secondary">
              {config.name}
            </span>
          )}
        </a>

        {/* Right: nav links (desktop) + cart */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-muted hover:text-secondary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
          <CartButton />
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
            className="lg:hidden bg-white border-t border-neutral-dark/50 overflow-hidden"
          >
            <div className="px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-sm tracking-widest uppercase text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
