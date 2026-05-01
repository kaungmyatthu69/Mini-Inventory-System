<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import CartItem from '@/components/CartItem.vue'
import { formatCurrency } from '@/utils/format'
import type { CartItem as CartItemType } from '@/stores/cart'

defineProps<{
  items: CartItemType[]
  total: number
  loading: boolean
}>()

const emit = defineEmits<{
  increment: [productId: string]
  decrement: [productId: string]
  remove: [productId: string]
  submit: []
}>()
</script>

<template>
  <div>
    <h2 class="text-sm font-semibold text-gray-700 mb-3">Order Items</h2>

    <div v-if="items.length === 0" class="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-center">
      <ShoppingCart class="h-8 w-8 text-gray-300" />
      <p class="mt-2 text-sm text-gray-400">Your cart is empty</p>
      <p class="text-xs text-gray-300">Add products from the left panel.</p>
    </div>

    <div v-else class="space-y-2">
      <CartItem
        v-for="item in items"
        :key="item.productId"
        :product-name="item.productName"
        :unit-price="item.unitPrice"
        :quantity="item.quantity"
        :max-stock="item.maxStock"
        @increment="emit('increment', item.productId)"
        @decrement="emit('decrement', item.productId)"
        @remove="emit('remove', item.productId)"
      />

      <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">Total</span>
          <span class="text-lg font-bold text-slate-800">{{ formatCurrency(total) }}</span>
        </div>
        <button
          :disabled="loading"
          class="mt-3 h-11 w-full rounded-xl bg-slate-800 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          @click="emit('submit')"
        >
          {{ loading ? 'Creating...' : 'Create Order' }}
        </button>
      </div>
    </div>
  </div>
</template>
