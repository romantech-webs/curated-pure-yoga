export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: string
  compareAtPrice: string | null
  currency: string
  imageUrl: string | null
  featured: boolean
  categoryId: string | null
  benefits: string[] | null
  sortOrder: number
  category: { id: string; name: string; slug: string } | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface StoreData {
  products: Product[]
  categories: Category[]
  whatsapp: { number: string; template: string }
}

export interface CartItem {
  product: Product
  quantity: number
}
