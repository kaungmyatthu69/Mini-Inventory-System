<script setup lang="ts">
import { computed } from 'vue'
import { Package, ClipboardList, AlertTriangle, DollarSign } from 'lucide-vue-next'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '@/api/products'
import { getOrders } from '@/api/orders'

const { data: products, isLoading: productsLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => getProducts(),
})

const { data: orders, isLoading: ordersLoading } = useQuery({
  queryKey: ['orders'],
  queryFn: () => getOrders(),
})

const isLoading = computed(() => productsLoading.value || ordersLoading.value)

const totalProducts = computed(() => products.value?.length ?? 0)
const totalOrders = computed(() => orders.value?.length ?? 0)
const lowStockCount = computed(() => products.value?.filter((p) => p.quantity <= 5).length ?? 0)
const totalRevenue = computed(() =>
  orders.value?.reduce((sum, o) => sum + o.totalAmount, 0) ?? 0,
)

const recentOrders = computed(() =>
  orders.value?.slice(0, 5) ?? [],
)

const lowStockProducts = computed(() =>
  products.value?.filter((p) => p.quantity <= 10).slice(0, 5) ?? [],
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function statusClass(s: string) {
  const map: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600',
    confirmed: 'bg-blue-50 text-blue-600',
    shipped: 'bg-purple-50 text-purple-600',
    delivered: 'bg-emerald-50 text-emerald-600',
    cancelled: 'bg-red-50 text-red-600',
  }
  return map[s] || 'bg-gray-50 text-gray-600'
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>

    <!-- Loading -->
    <div v-if="isLoading" class="mt-8 flex items-center justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
    </div>

    <template v-else>
      <!-- Stat cards -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Package class="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Total Products</p>
              <p class="text-xl font-bold text-slate-800">{{ totalProducts }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <ClipboardList class="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Total Orders</p>
              <p class="text-xl font-bold text-slate-800">{{ totalOrders }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <DollarSign class="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Revenue</p>
              <p class="text-xl font-bold text-slate-800">${{ totalRevenue.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle class="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Low Stock</p>
              <p class="text-xl font-bold text-slate-800">{{ lowStockCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <!-- Recent Orders -->
        <div class="rounded-xl border border-gray-200 bg-white">
          <div class="border-b border-gray-100 px-5 py-4">
            <h2 class="text-sm font-semibold text-gray-700">Recent Orders</h2>
          </div>
          <div v-if="recentOrders.length === 0" class="p-6 text-center text-sm text-gray-400">
            No orders yet.
          </div>
          <div v-else class="divide-y divide-gray-100">
            <div
              v-for="order in recentOrders"
              :key="order.id"
              class="flex items-center justify-between px-5 py-3"
            >
              <div>
                <p class="text-sm font-medium text-gray-900">#{{ order.id.slice(0, 8) }}</p>
                <p class="text-xs text-gray-400">{{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-gray-700">${{ order.totalAmount.toFixed(2) }}</span>
                <span class="inline-flex rounded-lg px-2 py-0.5 text-xs font-medium capitalize" :class="statusClass(order.status)">
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Low Stock -->
        <div class="rounded-xl border border-gray-200 bg-white">
          <div class="border-b border-gray-100 px-5 py-4">
            <h2 class="text-sm font-semibold text-gray-700">Low Stock Alerts</h2>
          </div>
          <div v-if="lowStockProducts.length === 0" class="p-6 text-center text-sm text-gray-400">
            All products are well-stocked.
          </div>
          <div v-else class="divide-y divide-gray-100">
            <div
              v-for="product in lowStockProducts"
              :key="product.id"
              class="flex items-center justify-between px-5 py-3"
            >
              <div>
                <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                <p class="text-xs text-gray-400">{{ product.sku }}</p>
              </div>
              <span
                class="inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium"
                :class="product.quantity <= 5 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'"
              >
                {{ product.quantity }} left
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
