'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from './CartProvider'

export function CartButton() {
  const { toggleCart, itemCount } = useCart()

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-secondary hover:text-primary transition-colors"
      aria-label={`Carrito (${itemCount} productos)`}
    >
      <ShoppingBag className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-semibold w-4.5 h-4.5 flex items-center justify-center rounded-full leading-none">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  )
}
