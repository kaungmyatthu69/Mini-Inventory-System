<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Package } from 'lucide-vue-next'
import { useProducts } from '@/composables/useProducts'
import { useCategories } from '@/composables/useCategories'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { Product } from '@/models/product'

const router = useRouter()
const cartStore = useCartStore()

const search = ref('')
const category = ref('')
const page = ref(1)

watch([search, category], () => { page.value = 1 })

const { data: productsWithPagination, isLoading, isError } = useProducts(search, category, page)
const { categories } = useCategories()

const products = computed(() => productsWithPagination.value?.data.items ?? [])
const pagination = computed(() => productsWithPagination.value?.data.pagination)

function handleAddToOrder(product: Product) {
  cartStore.add(product)
  router.push({ name: 'create-order' })
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-800">Products</h1>
    </div>

    <!-- Filters -->
    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
      <SearchInput v-model="search" placeholder="Search products..." />
      <select
        v-model="category"
        class="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">All categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
      </select>
    </div>

    <!-- Pagination -->
     <div class="mt-6">
        <Pagination :pagination="pagination" @update:page="page = $event" />
      </div>

    <!-- Loading -->
    <LoadingSpinner v-if="isLoading" class="mt-8" />

    <!-- Error -->
    <div v-else-if="isError" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
      Failed to load products. Please try again later.
    </div>

    <!-- Empty -->
    <div v-else-if="products.length === 0" class="mt-8 flex flex-col items-center justify-center py-16 text-center">
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <Package class="h-7 w-7 text-slate-400" />
      </div>
      <p class="mt-4 text-sm font-medium text-slate-600">No products found</p>
      <p class="mt-1 text-sm text-slate-400">Try adjusting your search or filter.</p>
    </div>

    <!-- Product Cards -->
    <template v-else>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add="handleAddToOrder(product)"
        />
      </div>


    </template>
  </div>
</template>
