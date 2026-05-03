<script setup lang="ts">
import { computed } from 'vue'
import { Package, ClipboardList, AlertTriangle, DollarSign } from 'lucide-vue-next'
import { useDashboard } from '@/composables/useDashboard'
import { formatShortDate, formatCurrency } from '@/utils/format'
import StatCard from '@/components/StatCard.vue'
import DashboardPanel from '@/components/DashboardPanel.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const { isLoading, stats, recentOrders, lowStockAlerts } = useDashboard()

const statCards = computed(() => [
  {
    icon: Package,
    label: 'Total Products',
    value: stats.value?.total_products ?? 0,
    iconClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
  },
  {
    icon: ClipboardList,
    label: 'Total Orders',
    value: stats.value?.total_orders ?? 0,
    iconClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
  },
  {
    icon: DollarSign,
    label: 'Revenue',
    value: formatCurrency(stats.value?.revenue ?? 0),
    iconClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
  },
  {
    icon: AlertTriangle,
    label: 'Low Stock',
    value: stats.value?.low_stock ?? 0,
    iconClass: 'text-red-600',
    bgClass: 'bg-red-50',
  },
])
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>

    <!-- Loading -->
    <LoadingSpinner v-if="isLoading" class="mt-8" />

    <template v-else>
      <!-- Stat cards -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          v-for="stat in statCards"
          :key="stat.label"
          :icon="stat.icon"
          :label="stat.label"
          :value="stat.value"
          :icon-class="stat.iconClass"
          :bg-class="stat.bgClass"
        />
      </div>

      <!-- Panels -->
      <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <!-- Recent Orders -->
        <DashboardPanel
          title="Recent Orders"
          empty-text="No orders yet."
          :items="recentOrders"
          v-if="recentOrders.length > 0"
        >
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between px-5 py-3"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">#{{ order.id.slice(0, 8) }}</p>
              <p class="text-xs text-gray-400">{{ formatShortDate(order.created_at) }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-gray-700">{{
                formatCurrency(order.total_price)
              }}</span>
              <StatusBadge :status="order.order_status" />
            </div>
          </div>
        </DashboardPanel>

        <!-- Low Stock -->
        <DashboardPanel
          title="Low Stock Alerts"
          empty-text="All products are well-stocked."
          :items="lowStockAlerts"
          v-if="lowStockAlerts.length > 0"
        >
          <div
            v-for="product in lowStockAlerts"
            :key="product.id"
            class="flex items-center justify-between px-5 py-3"
          >
            <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
            <span
              class="inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium"
              :class="product.stock <= 5 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'"
            >
              {{ product.stock }} left
            </span>
          </div>
        </DashboardPanel>
      </div>
    </template>
  </div>
</template>
