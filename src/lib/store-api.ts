import type { StoreData, CartItem } from '@/types/store'

const API_BASE = 'https://app.romantechwebs.com'
const PROJECT_ID = 'wp_8e2c4541-0dfc-42b9-b95f-6ad765d7b2ba'

export async function fetchProducts(): Promise<StoreData> {
  const res = await fetch(`${API_BASE}/api/products/public/${PROJECT_ID}`)
  if (!res.ok) return { products: [], categories: [], whatsapp: { number: '', template: '' } }
  return res.json()
}

export async function createCheckout(
  items: CartItem[],
  customer: { name: string; email?: string },
): Promise<{ checkoutUrl: string; orderId: string }> {
  const res = await fetch(`${API_BASE}/api/store/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      projectId: PROJECT_ID,
      items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      customer,
      successUrl: 'https://curatedbyac.com/tienda/confirmacion/?order={orderId}',
      cancelUrl: 'https://curatedbyac.com/tienda/',
    }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Error al procesar el pago')
  }
  return res.json()
}
