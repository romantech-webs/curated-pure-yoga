'use client'

import { config } from '@/lib/config'

export function Newsletter() {
  const whatsappUrl = `https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent('Hola, me gustaría suscribirme a la newsletter de Curated para recibir ofertas y novedades.')}`

  return (
    <section className="py-12 md:py-16 bg-white border-t border-neutral-dark">
      <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-secondary tracking-wide">
          Suscríbete a nuestra newsletter
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Únete a nuestro club de belleza para estar enterada de todas las novedades y ofertas exclusivas.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
          }}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Nombre y apellidos *"
            className="flex-1 px-4 py-3 border border-neutral-dark bg-white text-sm text-secondary placeholder-muted focus:outline-none focus:border-secondary transition-colors"
          />
          <input
            type="email"
            placeholder="Email *"
            className="flex-1 px-4 py-3 border border-neutral-dark bg-white text-sm text-secondary placeholder-muted focus:outline-none focus:border-secondary transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-secondary text-white text-xs tracking-widest uppercase hover:bg-secondary/90 transition-colors duration-300 shrink-0"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  )
}
