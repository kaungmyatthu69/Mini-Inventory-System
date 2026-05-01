<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-vue-next'
import { useQuery } from '@tanstack/vue-query'
import { useCreateOrder } from '@/composables/useOrders'
import { getProducts } from '@/api/products'

const router = useRouter()
const createOrderMutation = useCreateOrder()

const { data: products } = useQuery({
  queryKey: ['products', { search: '' }],
  queryFn: () => getProducts(),
})

interface CartItem {
  productId: string
  productName: string
  unitPrice: number
  quantity: number
}

const cart = ref<CartItem[]>([])
const errorMsg = ref('')

const total = computed(() => cart.value.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0))

function addToCart(productId: string, name: string, price: number) {
  const existing = cart.value.find((item) => item.productId === productId)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ productId, productName: name, unitPrice: price, quantity: 1 })
  }
}

function updateQuantity(productId: string, delta: number) {
  const item = cart.value.find((i) => i.productId === productId)
  if (!item) return
  item.quantity += delta
  if (item.quantity <= 0) {
    cart.value = cart.value.filter((i) => i.productId !== productId)
  }
}

function removeFromCart(productId: string) {
  cart.value = cart.value.filter((i) => i.productId !== productId)
}

const availableProducts = computed(() => {
  if (!products.value) return []
  const cartIds = new Set(cart.value.map((i) => i.productId))
  return products.value.filter((p) => !cartIds.has(p.id))
})

async function handleSubmit() {
  if (cart.value.length === 0) return

  errorMsg.value = ''
  try {
    await createOrderMutation.mutateAsync({
      items: cart.value.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    })
    router.push({ name: 'orders' })
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosErr = err as { response?: { data?: { message?: string } } }
      errorMsg.value = axiosErr.response?.data?.message || 'Failed to create order.'
    } else {
      errorMsg.value = 'Something went wrong. Please try again.'
    }
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-800">Create Order</h1>
    <p class="mt-1 text-sm text-gray-500">Select products and quantities to create a new order.</p>

    <div v-if="errorMsg" class="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
      {{ errorMsg }}
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <!-- Product selector -->
      <div>
        <h2 class="text-sm font-semibold text-gray-700 mb-3">Available Products</h2>
        <div class="space-y-2 max-h-[500px] overflow-y-auto">
          <div
            v-for="product in availableProducts"
            :key="product.id"
            class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300"
          >
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</p>
              <p class="text-xs text-gray-400">${{ product.price.toFixed(2) }} &middot; {{ product.quantity }} in stock</p>
            </div>
            <button
              class="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white transition-colors hover:bg-slate-700"
              @click="addToCart(product.id, product.name, product.price)"
            >
              <Plus class="h-4 w-4" />
            </button>
          </div>
          <div v-if="availableProducts.length === 0" class="rounded-xl border border-dashed border-gray-200 p-6 text-center">
            <p class="text-sm text-gray-400">All products added to cart.</p>
          </div>
        </div>
      </div>

      <!-- Cart -->
      <div>
        <h2 class="text-sm font-semibold text-gray-700 mb-3">Order Items</h2>
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-center">
          <ShoppingCart class="h-8 w-8 text-gray-300" />
          <p class="mt-2 text-sm text-gray-400">Your cart is empty</p>
          <p class="text-xs text-gray-300">Add products from the left panel.</p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="item in cart"
            :key="item.productId"
            class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3"
          >
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">{{ item.productName }}</p>
              <p class="text-xs text-gray-400">${{ item.unitPrice.toFixed(2) }} each</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50"
                @click="updateQuantity(item.productId, -1)"
              >
                <Minus class="h-3 w-3" />
              </button>
              <span class="w-8 text-center text-sm font-medium text-gray-700">{{ item.quantity }}</span>
              <button
                class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50"
                @click="updateQuantity(item.productId, 1)"
              >
                <Plus class="h-3 w-3" />
              </button>
              <button
                class="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                @click="removeFromCart(item.productId)"
              >
                <Trash2 class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <!-- Total + Submit -->
          <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Total</span>
              <span class="text-lg font-bold text-slate-800">${{ total.toFixed(2) }}</span>
            </div>
            <button
              :disabled="!!createOrderMutation.isPending"
              class="mt-3 h-11 w-full rounded-xl bg-slate-800 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              @click="handleSubmit"
            >
              {{ createOrderMutation.isPending ? 'Creating...' : 'Create Order' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
