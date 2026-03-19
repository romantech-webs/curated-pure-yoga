'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react'
import type { Product, CartItem } from '@/types/store'

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE' }
  | { type: 'SET_OPEN'; open: boolean }
  | { type: 'HYDRATE'; items: CartItem[] }

interface CartState {
  items: CartItem[]
  isOpen: boolean
  hydrated: boolean
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: Math.min(99, i.quantity + 1) }
              : i,
          ),
        }
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product: action.product, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: Math.min(99, action.quantity) }
            : i,
        ),
      }
    }
    case 'CLEAR':
      return { ...state, items: [], isOpen: false }
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen }
    case 'SET_OPEN':
      return { ...state, isOpen: action.open }
    case 'HYDRATE':
      return { ...state, items: action.items, hydrated: true }
    default:
      return state
  }
}

const STORAGE_KEY = 'curated-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    hydrated: false,
  })

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const items = JSON.parse(saved) as CartItem[]
        dispatch({ type: 'HYDRATE', items })
      } else {
        dispatch({ type: 'HYDRATE', items: [] })
      }
    } catch {
      dispatch({ type: 'HYDRATE', items: [] })
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (state.hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    }
  }, [state.items, state.hydrated])

  const addItem = useCallback((product: Product) => dispatch({ type: 'ADD_ITEM', product }), [])
  const removeItem = useCallback((productId: string) => dispatch({ type: 'REMOVE_ITEM', productId }), [])
  const updateQuantity = useCallback((productId: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE' }), [])
  const setCartOpen = useCallback((open: boolean) => dispatch({ type: 'SET_OPEN', open }), [])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + parseFloat(i.product.price) * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
