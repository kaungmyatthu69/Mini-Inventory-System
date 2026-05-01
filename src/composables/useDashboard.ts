import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getDashboard } from '@/api/dashboard'

export function useDashboard() {
  const query = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  })

  const stats = computed(() => query.data.value?.data)
  const recentOrders = computed(() => stats.value?.recent_orders ?? [])
  const lowStockAlerts = computed(() => stats.value?.low_stock_alerts ?? [])

  return { ...query, stats, recentOrders, lowStockAlerts }
}
