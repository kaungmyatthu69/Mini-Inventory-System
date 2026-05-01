<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ClipboardList, Plus } from 'lucide-vue-next'
import { useOrders } from '@/composables/useOrders'

const status = ref('')
const { data: orders, isLoading, isError } = useOrders(status)

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
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
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-800">Orders</h1>
      <RouterLink
        to="/orders/create"
        class="flex h-10 items-center gap-2 rounded-xl bg-slate-800 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        <Plus class="h-4 w-4" />
        New Order
      </RouterLink>
    </div>

    <!-- Filter -->
    <div class="mt-6">
      <select
        v-model="status"
        class="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="mt-8 flex items-center justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
      Failed to load orders. Please try again later.
    </div>

    <!-- Empty -->
    <div v-else-if="orders && orders.length === 0" class="mt-8 flex flex-col items-center justify-center py-16 text-center">
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <ClipboardList class="h-7 w-7 text-slate-400" />
      </div>
      <p class="mt-4 text-sm font-medium text-slate-600">No orders found</p>
      <p class="mt-1 text-sm text-slate-400">Create your first order to get started.</p>
    </div>

    <!-- Table -->
    <div v-else class="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-gray-100 bg-slate-50/50">
          <tr>
            <th class="px-4 py-3 font-medium text-gray-500">Order ID</th>
            <th class="px-4 py-3 font-medium text-gray-500">Date</th>
            <th class="px-4 py-3 font-medium text-gray-500">Items</th>
            <th class="px-4 py-3 font-medium text-gray-500">Total</th>
            <th class="px-4 py-3 font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="order in orders" :key="order.id" class="transition-colors hover:bg-slate-50/50">
            <td class="px-4 py-3 font-mono text-xs text-gray-500">#{{ order.id.slice(0, 8) }}</td>
            <td class="px-4 py-3 text-gray-600">{{ formatDate(order.createdAt) }}</td>
            <td class="px-4 py-3 text-gray-600">{{ order.items.length }} item{{ order.items.length !== 1 ? 's' : '' }}</td>
            <td class="px-4 py-3 text-gray-700 font-medium">${{ order.totalAmount.toFixed(2) }}</td>
            <td class="px-4 py-3">
              <span class="inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium capitalize" :class="statusClass(order.status)">
                {{ order.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
