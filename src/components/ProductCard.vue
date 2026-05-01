<script setup lang="ts">
import { Package, ShoppingCart } from 'lucide-vue-next'
import type { Product } from '@/models/product'
import { formatCurrency } from '@/utils/format'

defineProps<{ product: Product }>()

const emit = defineEmits<{
  add: []
}>()
</script>

<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
      <Package class="h-5 w-5 text-slate-500" />
    </div>

    <h3 class="mt-3 text-sm font-semibold text-gray-900">{{ product.name }}</h3>

    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm font-bold text-slate-800">{{ formatCurrency(product.price) }}</p>
      <span
        class="inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium"
        :class="product.stock <= 5 ? 'bg-red-50 text-red-600' : product.stock <= 20 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'"
      >
        {{ product.stock }} in stock
      </span>
    </div>

    <button
      :disabled="product.stock <= 0"
      class="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-slate-800 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      @click="emit('add')"
    >
      <ShoppingCart class="h-4 w-4" />
      Add to Order
    </button>
  </div>
</template>
