import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/models/product'

export interface CartItem {
  productId: string
  productName: string
  unitPrice: number
  quantity: number
  maxStock: number
}

const STORAGE_KEY = 'cart'

function loadCart(): CartItem[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCart())

  watch(items, (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true })

  const total = computed(() => items.value.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0))

  const quantities = computed(() => {
    const map = new Map<string, number>()
    for (const item of items.value) map.set(item.productId, item.quantity)
    return map
  })

  function add(product: Product) {
    const existing = items.value.find((item) => item.productId === product.id)
    if (existing) {
      if (existing.quantity < existing.maxStock) existing.quantity++
    } else {
      items.value.push({ productId: product.id, productName: product.name, unitPrice: product.price, quantity: 1, maxStock: product.stock })
    }
  }

  function increment(productId: string) {
    const item = items.value.find((i) => i.productId === productId)
    if (item && item.quantity < item.maxStock) item.quantity++
  }

  function decrement(productId: string) {
    const item = items.value.find((i) => i.productId === productId)
    if (!item) return
    const next = item.quantity - 1
    if (next <= 0) {
      items.value = items.value.filter((i) => i.productId !== productId)
    } else {
      item.quantity = next
    }
  }

  function remove(productId: string) {
    items.value = items.value.filter((i) => i.productId !== productId)
  }

  function clear() {
    items.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  return { items, total, quantities, add, increment, decrement, remove, clear }
})
