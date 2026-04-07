'use client'

import { useEffect, useState, useRef } from 'react'
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchProducts } from '@/lib/store-api'
import { useCart } from '@/components/store/CartProvider'
import type { Product } from '@/types/store'

export function TopSellers() {
  const [products, setProducts] = useState<Product[]>([])
  const [current, setCurrent] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const featured = data.products.filter((p) => p.featured)
        setProducts(featured.length > 0 ? featured : data.products.slice(0, 8))
      })
      .catch(() => {})
  }, [])

  if (products.length === 0) return null

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.clientWidth || 280
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' })
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-center text-secondary tracking-wide">
          NUESTROS TOP VENTAS
        </h2>
        <p className="mt-3 text-sm text-muted text-center max-w-lg mx-auto leading-relaxed">
          Los tratamientos de belleza más populares de la temporada y los productos que los complementan.
        </p>

        {/* Product grid / carousel */}
        <div className="relative mt-12">
          {/* Left arrow */}
          {products.length > 4 && (
            <button
              onClick={() => scrollBy(-1)}
              className="absolute -left-3 top-1/3 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-neutral-dark rounded-full shadow-sm hover:shadow-md transition-shadow hidden md:flex"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-secondary" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => {
              const hasDiscount = product.compareAtPrice &&
                parseFloat(product.compareAtPrice) > parseFloat(product.price)

              return (
                <div
                  key={product.id}
                  className="snap-center shrink-0 w-[260px] sm:w-[280px]"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-neutral">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-muted/20" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-4 text-center">
                    <h3 className="text-sm font-medium text-secondary leading-snug">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      {hasDiscount && (
                        <span className="text-sm text-muted line-through">
                          {parseFloat(product.compareAtPrice!).toFixed(2).replace('.', ',')}€
                        </span>
                      )}
                      <span className="text-sm font-medium text-secondary">
                        {parseFloat(product.price).toFixed(2).replace('.', ',')}€
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted">
                      Impuesto incluido
                    </p>

                    <button
                      onClick={() => addItem(product)}
                      className="mt-4 w-full border border-secondary text-secondary text-xs tracking-widest uppercase py-2.5 hover:bg-secondary hover:text-white transition-all duration-300"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right arrow */}
          {products.length > 4 && (
            <button
              onClick={() => scrollBy(1)}
              className="absolute -right-3 top-1/3 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-neutral-dark rounded-full shadow-sm hover:shadow-md transition-shadow hidden md:flex"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-secondary" />
            </button>
          )}
        </div>

        {/* Dots */}
        {products.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current
                  if (!el) return
                  const cardWidth = el.firstElementChild?.clientWidth || 280
                  el.scrollTo({ left: i * (cardWidth + 24), behavior: 'smooth' })
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === current ? 'bg-secondary' : 'bg-neutral-dark'
                }`}
                aria-label={`Producto ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
