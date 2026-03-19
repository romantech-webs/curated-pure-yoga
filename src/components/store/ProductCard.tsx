'use client'

import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/types/store'
import { useCart } from './CartProvider'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
  index: number
}

export function ProductCard({ product, onSelect, index }: ProductCardProps) {
  const { addItem } = useCart()

  const hasDiscount = product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-neutral-dark hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <button
        onClick={() => onSelect(product)}
        className="block w-full aspect-square overflow-hidden bg-neutral relative"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-muted/30" />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Destacado
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Oferta
          </span>
        )}
      </button>

      {/* Info */}
      <div className="p-4">
        {product.category && (
          <span className="text-xs font-medium text-primary tracking-wide uppercase">
            {product.category.name}
          </span>
        )}
        <button
          onClick={() => onSelect(product)}
          className="block w-full text-left mt-1"
        >
          <h3 className="text-sm font-medium text-secondary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </button>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-secondary">
              {parseFloat(product.price).toFixed(2)} {product.currency}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted line-through">
                {parseFloat(product.compareAtPrice!).toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              addItem(product)
            }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
