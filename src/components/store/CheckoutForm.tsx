'use client'

import { useState } from 'react'
import { ArrowLeft, Loader2, Lock } from 'lucide-react'
import { useCart } from './CartProvider'
import { createCheckout } from '@/lib/store-api'

interface CheckoutFormProps {
  onBack: () => void
  onClose: () => void
}

export function CheckoutForm({ onBack, onClose }: CheckoutFormProps) {
  const { items, subtotal, clearCart } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError('')

    try {
      const { checkoutUrl } = await createCheckout(items, {
        name: name.trim(),
        email: email.trim() || undefined,
      })

      if (checkoutUrl) {
        clearCart()
        onClose()
        window.location.href = checkoutUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago')
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted hover:text-secondary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al carrito
        </button>

        <h3 className="text-lg font-medium text-secondary mb-1">Datos de contacto</h3>
        <p className="text-sm text-muted mb-6">
          Para confirmar tu pedido y enviarte la factura
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-medium text-secondary mb-1.5">
              Nombre *
            </label>
            <input
              id="checkout-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full px-4 py-3 rounded-xl border border-neutral-dark bg-neutral text-secondary placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="checkout-email" className="block text-sm font-medium text-secondary mb-1.5">
              Email
            </label>
            <input
              id="checkout-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com (opcional)"
              className="w-full px-4 py-3 rounded-xl border border-neutral-dark bg-neutral text-secondary placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-dark px-6 py-5 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted">Total</span>
          <span className="text-lg font-medium text-secondary">{subtotal.toFixed(2)} EUR</span>
        </div>
        <button
          onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
          disabled={loading || !name.trim()}
          className="w-full bg-secondary text-white py-3.5 rounded-xl font-medium hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pagar con tarjeta
            </>
          )}
        </button>
        <p className="text-xs text-muted text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Pago seguro con Stripe
        </p>
      </div>
    </div>
  )
}
