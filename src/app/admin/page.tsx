'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Package, Tag, ShoppingCart, Settings, Plus, Pencil, Trash2,
  Star, ImageIcon, Upload, LogOut, Eye, EyeOff, Loader2, AlertCircle, Check,
} from 'lucide-react'
import type {
  Product, Category, Order, ValidateResponse,
} from '@/lib/owner-api'
import {
  validateToken, fetchOwnerProducts, fetchOwnerCategories, fetchOwnerOrders,
  createProduct, updateProduct, deleteProduct, uploadProductImage,
  createCategory, updateCategory, deleteCategory, rotateToken,
} from '@/lib/owner-api'

// --- Types ---
type Tab = 'productos' | 'categorias' | 'pedidos' | 'ajustes'

interface Session {
  token: string
  projectId: string
  clinicName: string
  plan: string
  maxProducts: number
  maxCategories: number
}

// --- Main ---
export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('curated_admin')
    if (saved) {
      try {
        setSession(JSON.parse(saved))
      } catch { /* ignore */ }
    }
    setLoading(false)
  }, [])

  const handleLogin = (s: Session) => {
    localStorage.setItem('curated_admin', JSON.stringify(s))
    setSession(s)
  }

  const handleLogout = () => {
    localStorage.removeItem('curated_admin')
    setSession(null)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted" /></div>
  if (!session) return <LoginScreen onLogin={handleLogin} />
  return <Dashboard session={session} onLogout={handleLogout} onSessionUpdate={handleLogin} />
}

// --- Login ---
function LoginScreen({ onLogin }: { onLogin: (s: Session) => void }) {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const t = token.trim()
    if (!t) return
    setLoading(true)
    setError('')
    try {
      const data: ValidateResponse = await validateToken(t)
      if (!data.valid) throw new Error('Token inválido')
      onLogin({
        token: t,
        projectId: data.projectId,
        clinicName: data.clinicName,
        plan: data.productsPlan,
        maxProducts: data.config.maxProducts,
        maxCategories: data.config.maxCategories,
      })
    } catch {
      setError('Token inválido o expirado. Contacta con soporte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-light text-secondary tracking-wide">CURATED BY AC</h1>
          <p className="mt-2 text-sm text-muted">Panel de administración</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 border border-neutral-dark space-y-4">
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-2">Token de acceso</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="pt_..."
              className="w-full px-4 py-3 border border-neutral-dark text-sm focus:outline-none focus:border-secondary transition-colors"
              autoFocus
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full bg-secondary text-white text-xs tracking-widest uppercase py-3.5 hover:bg-secondary/90 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Acceder'}
          </button>
        </form>
      </div>
    </div>
  )
}

// --- Dashboard ---
function Dashboard({ session, onLogout, onSessionUpdate }: {
  session: Session
  onLogout: () => void
  onSessionUpdate: (s: Session) => void
}) {
  const [tab, setTab] = useState<Tab>('productos')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [prods, cats] = await Promise.all([
        fetchOwnerProducts(session.token, session.projectId),
        fetchOwnerCategories(session.token, session.projectId),
      ])
      setProducts(prods)
      setCategories(cats)
    } catch { /* ignore */ }
    setLoading(false)
  }, [session])

  useEffect(() => { loadData() }, [loadData])

  useEffect(() => {
    if (tab === 'pedidos' && orders.length === 0) {
      fetchOwnerOrders(session.token, session.projectId)
        .then(setOrders)
        .catch(() => {})
    }
  }, [tab, orders.length, session])

  const tabs: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: 'productos', label: 'Productos', icon: Package },
    { id: 'categorias', label: 'Categorías', icon: Tag },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart },
    { id: 'ajustes', label: 'Ajustes', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <header className="bg-white border-b border-neutral-dark sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-display text-lg font-light text-secondary tracking-wide">CURATED BY AC</h1>
          <button onClick={onLogout} className="flex items-center gap-1.5 text-xs text-muted hover:text-secondary transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-dark">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs tracking-wider uppercase border-b-2 transition-colors shrink-0 ${
                tab === id ? 'border-secondary text-secondary' : 'border-transparent text-muted hover:text-secondary'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted" />
          </div>
        ) : (
          <>
            {tab === 'productos' && (
              <ProductsTab
                session={session}
                products={products}
                categories={categories}
                onRefresh={loadData}
              />
            )}
            {tab === 'categorias' && (
              <CategoriesTab session={session} categories={categories} onRefresh={loadData} />
            )}
            {tab === 'pedidos' && <OrdersTab orders={orders} />}
            {tab === 'ajustes' && <SettingsTab session={session} onSessionUpdate={onSessionUpdate} />}
          </>
        )}
      </div>
    </div>
  )
}

// --- Products Tab ---
function ProductsTab({ session, products, categories, onRefresh }: {
  session: Session; products: Product[]; categories: Category[]; onRefresh: () => void
}) {
  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-secondary">
          {products.length} / {session.maxProducts} productos
        </h2>
        <button
          onClick={() => setCreating(true)}
          disabled={products.length >= session.maxProducts}
          className="flex items-center gap-1.5 bg-secondary text-white text-xs tracking-wider uppercase px-4 py-2.5 hover:bg-secondary/90 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Nuevo
        </button>
      </div>

      {/* Product list */}
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-neutral-dark p-4 flex items-center gap-4">
            {/* Image */}
            <div className="w-16 h-16 bg-neutral shrink-0 overflow-hidden flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl.startsWith('http') ? product.imageUrl : `https://curatedbyac.com${product.imageUrl}`} alt="" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-5 h-5 text-muted/30" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-secondary truncate">{product.name}</h3>
                {product.featured && <Star className="w-3.5 h-3.5 text-accent fill-accent shrink-0" />}
                {!product.active && <span className="text-[10px] bg-neutral-dark text-muted px-1.5 py-0.5 uppercase tracking-wider">Oculto</span>}
              </div>
              <p className="text-xs text-muted mt-0.5">
                {product.compareAtPrice && parseFloat(product.compareAtPrice) > 0 && (
                  <span className="line-through mr-1">{parseFloat(product.compareAtPrice).toFixed(2)}€</span>
                )}
                {product.price ? `${parseFloat(product.price).toFixed(2)}€` : 'Sin precio'}
                {product.category && <span className="ml-2 text-muted/60">· {product.category.name}</span>}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setEditing(product)} className="p-2 text-muted hover:text-secondary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={async () => {
                  if (!confirm(`¿Eliminar "${product.name}"?`)) return
                  await deleteProduct(session.token, session.projectId, product.id)
                  onRefresh()
                }}
                className="p-2 text-muted hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center text-sm text-muted py-12">No hay productos. Crea el primero.</p>
        )}
      </div>

      {/* Modal */}
      {(creating || editing) && (
        <ProductModal
          session={session}
          categories={categories}
          product={editing}
          onClose={() => { setCreating(false); setEditing(null) }}
          onSaved={() => { setCreating(false); setEditing(null); onRefresh() }}
        />
      )}
    </div>
  )
}

// --- Product Modal ---
function ProductModal({ session, categories, product, onClose, onSaved }: {
  session: Session; categories: Category[]; product: Product | null; onClose: () => void; onSaved: () => void
}) {
  const [name, setName] = useState(product?.name || '')
  const [description, setDescription] = useState(product?.description || '')
  const [price, setPrice] = useState(product?.price || '')
  const [compareAtPrice, setCompareAtPrice] = useState(product?.compareAtPrice || '')
  const [categoryId, setCategoryId] = useState(product?.categoryId || '')
  const [featured, setFeatured] = useState(product?.featured || false)
  const [active, setActive] = useState(product?.active ?? true)
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadProductImage(session.token, session.projectId, file)
      setImageUrl(url)
    } catch {
      setError('Error al subir imagen')
    }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    setError('')
    try {
      const data = {
        name: name.trim(),
        description: description.trim() || null,
        price: price ? parseFloat(price) : null,
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        categoryId: categoryId || null,
        featured,
        active,
        imageUrl: imageUrl || null,
      }
      if (product) {
        await updateProduct(session.token, session.projectId, { id: product.id, ...data } as Product & { id: string })
      } else {
        await createProduct(session.token, session.projectId, data as Partial<Product>)
      }
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-10 px-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg border border-neutral-dark mb-10">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-dark flex items-center justify-between">
          <h3 className="text-sm font-medium text-secondary">
            {product ? 'Editar producto' : 'Nuevo producto'}
          </h3>
          <button onClick={onClose} className="text-muted hover:text-secondary text-lg">&times;</button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Image */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-2">Imagen</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-neutral border border-neutral-dark overflow-hidden flex items-center justify-center shrink-0">
                {imageUrl ? (
                  <img src={imageUrl.startsWith('http') ? imageUrl : `https://curatedbyac.com${imageUrl}`} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted/30" />
                )}
              </div>
              <label className="flex items-center gap-1.5 border border-secondary text-secondary text-xs tracking-wider uppercase px-4 py-2.5 cursor-pointer hover:bg-secondary hover:text-white transition-all">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? 'Subiendo...' : 'Subir'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-1.5">Nombre *</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-dark text-sm focus:outline-none focus:border-secondary" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-1.5">Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full px-3 py-2.5 border border-neutral-dark text-sm focus:outline-none focus:border-secondary resize-none" />
          </div>

          {/* Price row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted mb-1.5">Precio (€)</label>
              <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-dark text-sm focus:outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted mb-1.5">Precio anterior (€)</label>
              <input type="number" step="0.01" min="0" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="Opcional"
                className="w-full px-3 py-2.5 border border-neutral-dark text-sm focus:outline-none focus:border-secondary" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-1.5">Categoría</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-dark text-sm focus:outline-none focus:border-secondary bg-white">
              <option value="">Sin categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 accent-accent" />
              <span className="text-sm text-secondary">Destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 accent-accent" />
              <span className="text-sm text-secondary">Visible</span>
            </label>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-dark flex justify-end gap-3">
          <button onClick={onClose} className="border border-neutral-dark text-secondary text-xs tracking-wider uppercase px-6 py-2.5 hover:bg-neutral transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving || !name.trim()}
            className="bg-secondary text-white text-xs tracking-wider uppercase px-6 py-2.5 hover:bg-secondary/90 transition-colors disabled:opacity-50 flex items-center gap-1.5">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Categories Tab ---
function CategoriesTab({ session, categories, onRefresh }: {
  session: Session; categories: Category[]; onRefresh: () => void
}) {
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleCreate = async () => {
    if (!name.trim()) return
    await createCategory(session.token, session.projectId, { name: name.trim() })
    setName('')
    onRefresh()
  }

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return
    await updateCategory(session.token, session.projectId, { id, name: editName.trim() })
    setEditingId(null)
    onRefresh()
  }

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`¿Eliminar categoría "${catName}"?`)) return
    await deleteCategory(session.token, session.projectId, id)
    onRefresh()
  }

  return (
    <div>
      <h2 className="text-sm font-medium text-secondary mb-6">
        {categories.length} / {session.maxCategories} categorías
      </h2>

      {/* Create */}
      <div className="flex gap-3 mb-6">
        <input value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de categoría"
          className="flex-1 px-3 py-2.5 border border-neutral-dark text-sm focus:outline-none focus:border-secondary"
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
        />
        <button onClick={handleCreate} disabled={!name.trim() || categories.length >= session.maxCategories}
          className="flex items-center gap-1.5 bg-secondary text-white text-xs tracking-wider uppercase px-4 py-2.5 hover:bg-secondary/90 disabled:opacity-50">
          <Plus className="w-4 h-4" /> Crear
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-neutral-dark p-4 flex items-center gap-4">
            {editingId === cat.id ? (
              <input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') handleUpdate(cat.id); if (e.key === 'Escape') setEditingId(null) }}
                className="flex-1 px-3 py-1.5 border border-secondary text-sm focus:outline-none" />
            ) : (
              <div className="flex-1">
                <span className="text-sm text-secondary">{cat.name}</span>
                <span className="ml-2 text-xs text-muted">/{cat.slug}</span>
              </div>
            )}
            <div className="flex items-center gap-2 shrink-0">
              {editingId === cat.id ? (
                <button onClick={() => handleUpdate(cat.id)} className="p-2 text-green-600 hover:text-green-700">
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={() => { setEditingId(cat.id); setEditName(cat.name) }} className="p-2 text-muted hover:text-secondary">
                  <Pencil className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => handleDelete(cat.id, cat.name)} className="p-2 text-muted hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-center text-sm text-muted py-12">No hay categorías.</p>
        )}
      </div>
    </div>
  )
}

// --- Orders Tab ---
function OrdersTab({ orders }: { orders: Order[] }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-secondary mb-6">{orders.length} pedidos</h2>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-10 h-10 text-muted/20 mx-auto mb-3" />
          <p className="text-sm text-muted">Aún no hay pedidos.</p>
          <p className="text-xs text-muted/60 mt-1">Aparecerán aquí cuando tus clientes compren.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-neutral-dark p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary">{order.customerName}</span>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                  order.status === 'paid' ? 'bg-green-50 text-green-700' :
                  order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-neutral-dark text-muted'
                }`}>
                  {order.status === 'paid' ? 'Pagado' : order.status === 'pending' ? 'Pendiente' : order.status}
                </span>
              </div>
              <div className="text-xs text-muted">
                {order.items.map((item, i) => (
                  <span key={i}>{i > 0 && ', '}{item.quantity}x {item.name}</span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted">{new Date(order.createdAt).toLocaleDateString('es-ES')}</span>
                <span className="font-medium text-secondary">{parseFloat(order.total).toFixed(2)}€</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Settings Tab ---
function SettingsTab({ session, onSessionUpdate }: {
  session: Session; onSessionUpdate: (s: Session) => void
}) {
  const [showToken, setShowToken] = useState(false)
  const [rotating, setRotating] = useState(false)

  const handleRotate = async () => {
    if (!confirm('¿Rotar token? El enlace anterior dejará de funcionar.')) return
    setRotating(true)
    try {
      const newToken = await rotateToken(session.token)
      const updated = { ...session, token: newToken }
      onSessionUpdate(updated)
    } catch { /* ignore */ }
    setRotating(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-neutral-dark p-6 space-y-4">
        <h3 className="text-sm font-medium text-secondary">Información del plan</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-muted uppercase tracking-wider">Negocio</span>
            <p className="text-secondary mt-0.5">{session.clinicName}</p>
          </div>
          <div>
            <span className="text-xs text-muted uppercase tracking-wider">Plan</span>
            <p className="text-secondary mt-0.5 capitalize">{session.plan}</p>
          </div>
          <div>
            <span className="text-xs text-muted uppercase tracking-wider">Máx. productos</span>
            <p className="text-secondary mt-0.5">{session.maxProducts}</p>
          </div>
          <div>
            <span className="text-xs text-muted uppercase tracking-wider">Máx. categorías</span>
            <p className="text-secondary mt-0.5">{session.maxCategories}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-dark p-6 space-y-4">
        <h3 className="text-sm font-medium text-secondary">Token de acceso</h3>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-neutral px-3 py-2 text-xs text-muted font-mono truncate">
            {showToken ? session.token : '••••••••••••••••••••••••'}
          </code>
          <button onClick={() => setShowToken(!showToken)} className="p-2 text-muted hover:text-secondary">
            {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <button onClick={handleRotate} disabled={rotating}
          className="text-xs text-red-600 hover:text-red-700 transition-colors flex items-center gap-1.5">
          {rotating ? <Loader2 className="w-3 h-3 animate-spin" /> : <AlertCircle className="w-3 h-3" />}
          Rotar token (invalida el anterior)
        </button>
      </div>

      <div className="bg-white border border-neutral-dark p-6">
        <h3 className="text-sm font-medium text-secondary mb-2">Soporte</h3>
        <p className="text-sm text-muted">
          ¿Necesitas ayuda? Contacta con nosotros por WhatsApp o email.
        </p>
        <a href="https://wa.me/34644741600" target="_blank" rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-secondary underline hover:no-underline">
          WhatsApp soporte
        </a>
      </div>
    </div>
  )
}
