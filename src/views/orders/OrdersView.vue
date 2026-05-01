<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { ClipboardList, Plus } from 'lucide-vue-next'
import { useOrders } from '@/composables/useOrders'
import { ORDER_STATUS_OPTIONS } from '@/constants/order'
import OrderRow from '@/components/OrderRow.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const status = ref('')
const page = ref(1)

watch(status, () => { page.value = 1 })

const { orders, pagination, isLoading, isError } = useOrders(status, page)

const expandedId = ref<string | null>(null)

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
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
        <option v-for="opt in ORDER_STATUS_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="isLoading" class="mt-8" />

    <!-- Error -->
    <div v-else-if="isError" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
      Failed to load orders. Please try again later.
    </div>

    <!-- Empty -->
    <div v-else-if="orders.length === 0" class="mt-8 flex flex-col items-center justify-center py-16 text-center">
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <ClipboardList class="h-7 w-7 text-slate-400" />
      </div>
      <p class="mt-4 text-sm font-medium text-slate-600">No orders found</p>
      <p class="mt-1 text-sm text-slate-400">Create your first order to get started.</p>
    </div>

    <!-- Orders list -->
    <template v-else>
      <div class="mt-6 space-y-3">
        <OrderRow
          v-for="order in orders"
          :key="order.id"
          :order="order"
          :expanded="expandedId === order.id"
          @toggle="toggleExpand"
        />
      </div>

      <!-- Pagination -->
      <div class="mt-6">
        <Pagination :pagination="pagination" @update:page="page = $event" />
      </div>
    </template>
  </div>
</template>
