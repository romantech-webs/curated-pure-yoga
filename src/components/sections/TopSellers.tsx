'use client'

import { useEffect, useState, useRef } from 'react'
import { ShoppingBag } from 'lucide-react'
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
        setProducts(featured.length > 0 ? featured : data.products.slice(0, 6))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const cardWidth = el.firstElementChild?.clientWidth || 300
      const gap = 24
      setCurrent(Math.round(el.scrollLeft / (cardWidth + gap)))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [products])

  if (products.length === 0) return null

  const scrollTo = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.clientWidth || 300
    const gap = 24
    el.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' })
  }

  return (
    <section className="py-16 md:py-24 bg-neutral">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-center text-secondary tracking-wide">
          NUESTROS TOP VENTAS
        </h2>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => {
            const hasDiscount = product.compareAtPrice &&
              parseFloat(product.compareAtPrice) > parseFloat(product.price)

            return (
              <div
                key={product.id}
                className="snap-center shrink-0 w-[280px] sm:w-[320px] md:w-[340px]"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-neutral-dark">
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
                  <h3 className="text-base font-medium text-secondary leading-snug">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    {hasDiscount && (
                      <span className="text-sm text-muted line-through">
                        {parseFloat(product.compareAtPrice!).toFixed(2).replace('.', ',')}€
                      </span>
                    )}
                    <span className="text-base font-medium text-secondary">
                      {parseFloat(product.price).toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Impuesto incluido
                  </p>

                  <button
                    onClick={() => addItem(product)}
                    className="mt-4 w-full border border-secondary text-secondary text-xs tracking-widest uppercase py-3 hover:bg-secondary hover:text-white transition-all duration-300"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots */}
        {products.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
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
