<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { PaginationMeta } from '@/models/common'

withDefaults(defineProps<{
  pagination?: PaginationMeta
  simple?: boolean
}>(), {
  simple: false,
})

const emit = defineEmits<{
  'update:page': [value: number]
}>()

function buildPages(current: number, last: number): (number | '...')[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(last - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < last - 2) pages.push('...')
  pages.push(last)
  return pages
}
</script>

<template>
  <div v-if="pagination && pagination.last_page > 1">
    <!-- Simple mode -->
    <div v-if="simple" class="flex items-center justify-between pt-1">
      <p class="text-xs text-gray-400">Page {{ pagination.current_page }} of {{ pagination.last_page }}</p>
      <div class="flex gap-1">
        <button
          :disabled="pagination.current_page <= 1"
          class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          @click="emit('update:page', pagination.current_page - 1)"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
        <button
          :disabled="pagination.current_page >= pagination.last_page"
          class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          @click="emit('update:page', pagination.current_page + 1)"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Full mode -->
    <div v-else class="flex items-center justify-between">
      <p class="text-xs text-gray-400">
        Showing {{ (pagination.current_page - 1) * pagination.per_page + 1 }}–{{ Math.min(pagination.current_page * pagination.per_page, pagination.total) }} of {{ pagination.total }}
      </p>
      <div class="flex items-center gap-1">
        <button
          :disabled="pagination.current_page <= 1"
          class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          @click="emit('update:page', pagination.current_page - 1)"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
        <template v-for="p in buildPages(pagination.current_page, pagination.last_page)" :key="p">
          <span v-if="p === '...'" class="flex h-9 w-9 items-center justify-center text-xs text-gray-400">...</span>
          <button
            v-else
            class="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors"
            :class="p === pagination.current_page ? 'bg-slate-800 text-white' : 'text-gray-600 hover:bg-gray-100'"
            @click="emit('update:page', p)"
          >
            {{ p }}
          </button>
        </template>
        <button
          :disabled="pagination.current_page >= pagination.last_page"
          class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          @click="emit('update:page', pagination.current_page + 1)"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
