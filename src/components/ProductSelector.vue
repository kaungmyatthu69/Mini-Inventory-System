<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { Product } from '@/models/product'
import type { PaginationMeta } from '@/models/common'
import SearchInput from '@/components/SearchInput.vue'
import Pagination from '@/components/Pagination.vue'
import { formatCurrency } from '@/utils/format'

const props = defineProps<{
  products: Product[]
  cartQuantities: Map<string, number>
  pagination?: PaginationMeta
  search: string
  page: number
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:page': [value: number]
  add: [product: Product]
}>()

function remainingStock(product: Product) {
  return product.stock - (props.cartQuantities.get(product.id) ?? 0)
}
</script>

<template>
  <div>
    <h2 class="text-sm font-semibold text-gray-700 mb-3">Available Products</h2>

    <div class="mb-3">
      <SearchInput
        :model-value="search"
        size="sm"
        placeholder="Search products..."
        @update:model-value="emit('update:search', $event)"
      />
    </div>

    <div class="space-y-2">
      <div
        v-for="product in products"
        :key="product.id"
        class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300"
      >
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</p>
          <p class="text-xs text-gray-400">{{ formatCurrency(product.price) }} &middot; {{ remainingStock(product) }} left</p>
        </div>
        <button
          :disabled="remainingStock(product) <= 0"
          class="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          @click="emit('add', product)"
        >
          <Plus class="h-4 w-4" />
        </button>
      </div>

      <div v-if="products.length === 0" class="rounded-xl border border-dashed border-gray-200 p-6 text-center">
        <p class="text-sm text-gray-400">No products found.</p>
      </div>

      <Pagination simple :pagination="pagination" @update:page="emit('update:page', $event)" />
    </div>
  </div>
</template>
