'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ShoppingBag, MessageCircle } from 'lucide-react'
import { config } from '@/lib/config'

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 min-h-screen flex items-center">
      <div className="mx-auto max-w-lg px-5 md:px-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-3xl md:text-4xl font-light text-secondary mb-3">
          Gracias por tu compra
        </h1>

        <p className="text-muted leading-relaxed mb-2">
          Tu pedido ha sido procesado correctamente.
        </p>

        {orderId && (
          <p className="text-sm text-muted mb-8">
            Referencia: <span className="font-mono text-secondary">{orderId}</span>
          </p>
        )}

        <div className="bg-neutral rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-sm font-medium text-secondary mb-2">Recogida en centro</h3>
          <p className="text-sm text-muted leading-relaxed">
            Te avisaremos cuando tu pedido este listo para recoger en {config.address.street}, {config.address.city}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${config.whatsapp.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(`Hola, acabo de realizar un pedido${orderId ? ` (${orderId})` : ''} y tengo una consulta.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href="/tienda/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral text-secondary px-6 py-3 rounded-xl font-medium hover:bg-neutral-dark transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Seguir comprando
          </a>
        </div>
      </div>
    </section>
  )
}

export default function ConfirmacionPage() {
  return (
    <Suspense
      fallback={
        <section className="pt-28 pb-20 md:pt-36 md:pb-28 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted">Cargando...</div>
        </section>
      }
    >
      <ConfirmacionContent />
    </Suspense>
  )
}
