<script setup lang="ts">
import { ChevronDown, Package, User } from 'lucide-vue-next'
import { formatFullDate, formatCurrency } from '@/utils/format'
import type { Order } from '@/models/order'
import StatusBadge from '@/components/StatusBadge.vue'

defineProps<{
  order: Order
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: [id: string]
}>()
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all"
    :class="{ 'ring-1 ring-slate-200 shadow-sm': expanded }"
  >
    <!-- Order row (clickable) -->
    <button
      class="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/50"
      @click="emit('toggle', order.id)"
    >
      <ChevronDown
        class="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': expanded }"
      />
      <span class="font-mono text-xs text-gray-400">#{{ order.id.slice(0, 8) }}</span>
      <span v-if="order.user_name" class="inline-flex items-center gap-1 text-sm text-gray-600">
        <User class="h-3.5 w-3.5" />
        {{ order.user_name }}
      </span>
      <span class="text-sm text-gray-600">{{ formatFullDate(order.created_at) }}</span>
      <span class="text-sm text-gray-500">{{ order.products.length }} item{{ order.products.length !== 1 ? 's' : '' }}</span>
      <span class="ml-auto text-sm font-semibold text-gray-800">{{ formatCurrency(order.total_price) }}</span>
      <StatusBadge :status="order.order_status" />
    </button>

    <!-- Expanded: order items -->
    <div v-if="expanded" class="border-t border-gray-100 bg-slate-50/50">
      <div class="px-5 py-3">
        <p class="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">Order Items</p>
        <div class="space-y-2">
          <div
            v-for="item in order.products"
            :key="item.id"
            class="flex items-center gap-4 rounded-lg bg-white px-4 py-3 border border-gray-100"
          >
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
              <Package class="h-4 w-4 text-slate-500" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800">{{ item.product_name }}</p>
              <p class="text-xs text-gray-400">{{ item.quantity }} x {{ formatCurrency(Number(item.price)) }}</p>
            </div>
            <span class="text-sm font-medium text-gray-700">{{ formatCurrency(Number(item.subtotal)) }}</span>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
          <span class="text-xs text-gray-400">Subtotal</span>
          <span class="text-sm font-semibold text-slate-800">{{ formatCurrency(order.total_price) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
