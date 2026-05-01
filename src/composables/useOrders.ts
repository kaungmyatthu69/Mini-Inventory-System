import { computed, type Ref } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getOrders, createOrder } from '@/api/orders'
import type { CreateOrderPayload } from '@/models/order'

export function useOrders(status: Ref<string>) {
  return useQuery({
    queryKey: computed(() => ['orders', { status: status.value }]),
    queryFn: () => getOrders({ status: status.value || undefined }),
  })
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
