'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Check } from 'lucide-react'
import type { Product } from '@/types/store'
import { useCart } from './CartProvider'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart()

  if (!product) return null

  const hasDiscount = product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price)

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-secondary hover:bg-white shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row max-h-[90vh]">
              {/* Image */}
              <div className="md:w-1/2 aspect-square md:aspect-auto bg-neutral flex-shrink-0">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[300px] flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-muted/20" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                {product.category && (
                  <span className="text-xs font-medium text-primary tracking-[0.15em] uppercase">
                    {product.category.name}
                  </span>
                )}

                <h2 className="mt-2 text-2xl md:text-3xl font-light text-secondary leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-semibold text-secondary">
                    {parseFloat(product.price).toFixed(2)} {product.currency}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-muted line-through">
                      {parseFloat(product.compareAtPrice!).toFixed(2)}
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="mt-5 text-muted leading-relaxed">
                    {product.description}
                  </p>
                )}

                {product.benefits && product.benefits.length > 0 && (
                  <div className="mt-6 space-y-2.5">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    addItem(product)
                    onClose()
                  }}
                  className="w-full mt-8 bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  Añadir al carrito
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
