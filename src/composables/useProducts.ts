import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '@/api/products'

export function useProducts(search: Ref<string>, category: Ref<string>) {
  return useQuery({
    queryKey: computed(() => ['products', { search: search.value, category: category.value }]),
    queryFn: () => getProducts({ search: search.value || undefined, category: category.value || undefined }),
  })
}
