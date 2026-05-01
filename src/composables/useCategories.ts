import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getCategories } from '@/api/categories'

export function useCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  const categories = computed(() => query.data.value?.data.items ?? [])

  return { ...query, categories }
}
