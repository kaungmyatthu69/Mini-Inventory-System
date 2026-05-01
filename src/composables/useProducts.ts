import { computed, ref, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '@/api/products'

export function useProducts(search: Ref<string>, category: Ref<string>, page: Ref<number> = ref(1)) {
  return useQuery({
    queryKey: computed(() => ['products', { search: search.value, category: category.value, page: page.value }]),
    queryFn: () => getProducts({ search: search.value || undefined, category: category.value || undefined, page: page.value }),
  })
}
