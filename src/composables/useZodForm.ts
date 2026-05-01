import { ref } from 'vue'
import type { ZodType } from 'zod'

export function useZodForm<T extends Record<string, unknown>>(schema: ZodType<T>) {
  const errors = ref<Record<string, string>>({})

  function validate(data: unknown): data is T {
    const result = schema.safeParse(data)
    if (result.success) {
      errors.value = {}
      return true
    }

    errors.value = {}
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString()
      if (key && !errors.value[key]) {
        errors.value[key] = issue.message
      }
    }
    return false
  }

  return { errors, validate }
}
