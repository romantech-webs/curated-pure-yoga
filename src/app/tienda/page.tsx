'use client'

import { useState, useEffect } from 'react'
import { CategoryFilter } from '@/components/store/CategoryFilter'
import { ProductCard } from '@/components/store/ProductCard'
import { ProductModal } from '@/components/store/ProductModal'
import { fetchProducts } from '@/lib/store-api'
import type { Product, Category } from '@/types/store'

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.products)
        setCategories(data.categories)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCategory
    ? products.filter((p) => p.categoryId === activeCategory)
    : products

  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)
  const sorted = [...featured, ...rest]

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header — mimotbeauty style */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-secondary tracking-wide">
            NUESTRA TIENDA
          </h1>
          <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
            Bonos, tratamientos y packs seleccionados por nuestras especialistas. Compra online y recoge en centro.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-neutral" />
                <div className="mt-3 h-3 bg-neutral w-1/3 mx-auto" />
                <div className="mt-2 h-4 bg-neutral w-2/3 mx-auto" />
                <div className="mt-3 h-4 bg-neutral w-1/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted text-lg">Proximamente...</p>
            <p className="text-sm text-muted mt-2">Estamos preparando nuestro catálogo de productos</p>
          </div>
        ) : (
          <>
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {sorted.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  index={i}
                />
              ))}
            </div>

            {sorted.length === 0 && (
              <p className="text-center text-muted py-12">
                No hay productos en esta categoría
              </p>
            )}
          </>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
