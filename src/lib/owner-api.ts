const API_BASE = 'https://app.romantechwebs.com'

function authHeaders(token: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// --- Auth ---

export interface ValidateResponse {
  valid: boolean
  projectId: string
  clinicName: string
  productsPlan: string
  config: {
    enabled: boolean
    maxProducts: number
    maxCategories: number
  }
}

export async function validateToken(token: string): Promise<ValidateResponse> {
  const res = await fetch(`${API_BASE}/api/products/owner/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
  if (!res.ok) throw new Error('Token inválido')
  return res.json()
}

// --- Products ---

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: string | null
  compareAtPrice: string | null
  currency: string
  imageUrl: string | null
  featured: boolean
  active: boolean
  sortOrder: number
  categoryId: string | null
  benefits: string[] | null
  category: { id: string; name: string; slug: string } | null
}

export async function fetchOwnerProducts(token: string, projectId: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/api/products/owner/products?projectId=${projectId}`, {
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error('Error al cargar productos')
  const data = await res.json()
  return data.products
}

export async function createProduct(
  token: string,
  projectId: string,
  product: Partial<Product>,
): Promise<Product> {
  const res = await fetch(`${API_BASE}/api/products/owner/products`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ action: 'create', projectId, ...product }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Error al crear producto')
  }
  return res.json()
}

export async function updateProduct(
  token: string,
  projectId: string,
  product: Partial<Product> & { id: string },
): Promise<Product> {
  const res = await fetch(`${API_BASE}/api/products/owner/products`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ action: 'update', projectId, ...product }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Error al actualizar producto')
  }
  return res.json()
}

export async function deleteProduct(token: string, projectId: string, id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/products/owner/products`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ action: 'delete', projectId, id }),
  })
  if (!res.ok) throw new Error('Error al eliminar producto')
}

// --- Categories ---

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  active: boolean
  sortOrder: number
}

export async function fetchOwnerCategories(token: string, projectId: string): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/products/owner/categories?projectId=${projectId}`, {
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error('Error al cargar categorías')
  const data = await res.json()
  return data.categories
}

export async function createCategory(
  token: string,
  projectId: string,
  category: { name: string; description?: string },
): Promise<Category> {
  const res = await fetch(`${API_BASE}/api/products/owner/categories`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ action: 'create', projectId, ...category }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Error al crear categoría')
  }
  return res.json()
}

export async function updateCategory(
  token: string,
  projectId: string,
  category: Partial<Category> & { id: string },
): Promise<Category> {
  const res = await fetch(`${API_BASE}/api/products/owner/categories`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ action: 'update', projectId, ...category }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Error al actualizar categoría')
  }
  return res.json()
}

export async function deleteCategory(token: string, projectId: string, id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/products/owner/categories`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ action: 'delete', projectId, id }),
  })
  if (!res.ok) throw new Error('Error al eliminar categoría')
}

// --- Orders ---

export interface Order {
  id: string
  customerName: string
  customerEmail: string | null
  customerPhone: string | null
  items: Array<{ productId: string; name: string; quantity: number; price: string }>
  total: string
  currency: string
  status: string
  createdAt: string
}

export async function fetchOwnerOrders(token: string, projectId: string): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/api/products/owner/orders?projectId=${projectId}`, {
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error('Error al cargar pedidos')
  const data = await res.json()
  return data.orders
}

// --- Image Upload ---

export async function uploadProductImage(
  token: string,
  projectId: string,
  file: File,
): Promise<string> {
  const formData = new FormData()
  formData.append('projectId', projectId)
  formData.append('file', file)

  const res = await fetch(`${API_BASE}/api/products/owner/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  if (!res.ok) throw new Error('Error al subir imagen')
  const data = await res.json()
  return data.url
}

// --- Token ---

export async function rotateToken(token: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/products/owner/rotate-token`, {
    method: 'POST',
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error('Error al rotar token')
  const data = await res.json()
  return data.token
}
