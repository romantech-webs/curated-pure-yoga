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

  const formatPrice = (price: string) =>
    parseFloat(price).toFixed(2).replace('.', ',') + '€'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
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
            <ShoppingBag className="w-10 h-10 text-muted/20" />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2.5 py-1">
            Destacado
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1">
            Oferta
          </span>
        )}
      </button>

      {/* Info */}
      <div className="mt-4 text-center">
        {product.category && (
          <span className="text-xs text-muted tracking-wide uppercase">
            {product.category.name}
          </span>
        )}
        <button
          onClick={() => onSelect(product)}
          className="block w-full mt-1"
        >
          <h3 className="text-sm font-medium text-secondary leading-snug line-clamp-2">
            {product.name}
          </h3>
        </button>

        <div className="mt-2 flex items-center justify-center gap-2">
          {hasDiscount && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
          <span className="text-base font-medium text-secondary">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">
          Impuesto incluido
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation()
            addItem(product)
          }}
          className="mt-3 w-full border border-secondary text-secondary text-xs tracking-widest uppercase py-3 hover:bg-secondary hover:text-white transition-all duration-300"
          aria-label={`Añadir ${product.name} al carrito`}
        >
          Añadir al carrito
        </button>
      </div>
    </motion.div>
  )
}
