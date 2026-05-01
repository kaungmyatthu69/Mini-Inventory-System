<script setup lang="ts">
import { ref } from 'vue'
import { Search, Package } from 'lucide-vue-next'
import { useProducts } from '@/composables/useProducts'

const search = ref('')
const category = ref('')
const { data: products, isLoading, isError } = useProducts(search, category)

const categories = ['Electronics', 'Clothing', 'Food', 'Tools', 'Other']
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-800">Products</h1>
    </div>

    <!-- Filters -->
    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <select
        v-model="category"
        class="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">All categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="mt-8 flex items-center justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
      Failed to load products. Please try again later.
    </div>

    <!-- Empty -->
    <div v-else-if="products && products.length === 0" class="mt-8 flex flex-col items-center justify-center py-16 text-center">
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <Package class="h-7 w-7 text-slate-400" />
      </div>
      <p class="mt-4 text-sm font-medium text-slate-600">No products found</p>
      <p class="mt-1 text-sm text-slate-400">Try adjusting your search or filter.</p>
    </div>

    <!-- Table -->
    <div v-else class="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-gray-100 bg-slate-50/50">
          <tr>
            <th class="px-4 py-3 font-medium text-gray-500">Product</th>
            <th class="px-4 py-3 font-medium text-gray-500">SKU</th>
            <th class="px-4 py-3 font-medium text-gray-500">Category</th>
            <th class="px-4 py-3 font-medium text-gray-500">Price</th>
            <th class="px-4 py-3 font-medium text-gray-500">Stock</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="product in products" :key="product.id" class="transition-colors hover:bg-slate-50/50">
            <td class="px-4 py-3">
              <div>
                <p class="font-medium text-gray-900">{{ product.name }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ product.description }}</p>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-500 font-mono text-xs">{{ product.sku }}</td>
            <td class="px-4 py-3">
              <span class="inline-flex rounded-lg bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {{ product.category }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-700 font-medium">${{ product.price.toFixed(2) }}</td>
            <td class="px-4 py-3">
              <span
                class="inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium"
                :class="product.quantity <= 5 ? 'bg-red-50 text-red-600' : product.quantity <= 20 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'"
              >
                {{ product.quantity }} in stock
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
