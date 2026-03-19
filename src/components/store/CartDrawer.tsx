'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from './CartProvider'
import { CheckoutForm } from './CheckoutForm'

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const handleClose = () => {
    setCartOpen(false)
    setShowCheckout(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[95] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-dark">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-secondary">Tu carrito</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 text-muted hover:text-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showCheckout ? (
              <CheckoutForm onBack={() => setShowCheckout(false)} onClose={handleClose} />
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-neutral-dark mb-4" />
                      <p className="text-secondary font-medium mb-1">Tu carrito esta vacio</p>
                      <p className="text-sm text-muted">Explora nuestros productos y encuentra lo que necesitas</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-4 p-3 rounded-xl bg-neutral"
                        >
                          {/* Image */}
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-neutral-dark rounded-lg flex-shrink-0 flex items-center justify-center">
                              <ShoppingBag className="w-6 h-6 text-muted" />
                            </div>
                          )}

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-secondary truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-primary font-medium mt-0.5">
                              {parseFloat(item.product.price).toFixed(2)} {item.product.currency}
                            </p>

                            {/* Quantity controls */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-secondary hover:bg-primary hover:text-white transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-sm font-medium w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-secondary hover:bg-primary hover:text-white transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="p-1.5 text-muted hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="border-t border-neutral-dark px-6 py-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Subtotal</span>
                      <span className="text-lg font-medium text-secondary">
                        {subtotal.toFixed(2)} EUR
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                    >
                      Finalizar compra
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full text-sm text-muted hover:text-secondary transition-colors py-1"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
