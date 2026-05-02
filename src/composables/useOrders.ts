import { computed, type Ref } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getOrders, createOrder } from '@/api/orders'
import type { CreateOrderPayload } from '@/models/order'


export function useOrders(status: Ref<string>, page: Ref<number>) {
  const query = useQuery({
    queryKey: computed(() => ['orders', { status: status.value, page: page.value }]),
    queryFn: () => getOrders({ status: status.value || undefined, page: page.value }),
  })

  const orders = computed(() => query.data.value?.data.items ?? [])
  const pagination = computed(() => query.data.value?.data.pagination)

  return { ...query, orders, pagination }
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
