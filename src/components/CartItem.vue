<script setup lang="ts">
import { Minus, Plus, Trash2 } from 'lucide-vue-next'
import { formatCurrency } from '@/utils/format'

defineProps<{
  productName: string
  unitPrice: number
  quantity: number
  maxStock: number
}>()

const emit = defineEmits<{
  increment: []
  decrement: []
  remove: []
}>()
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-3">
    <div class="flex items-center gap-3">
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-gray-900 truncate">{{ productName }}</p>
        <p class="text-xs text-gray-400">{{ formatCurrency(unitPrice) }} each &middot; {{ maxStock }} in stock</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50"
          @click="emit('decrement')"
        >
          <Minus class="h-3 w-3" />
        </button>
        <span class="w-8 text-center text-sm font-medium text-gray-700">{{ quantity }}</span>
        <button
          :disabled="quantity >= maxStock"
          class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          @click="emit('increment')"
        >
          <Plus class="h-3 w-3" />
        </button>
        <button
          class="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          @click="emit('remove')"
        >
          <Trash2 class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
    <div class="mt-2 flex justify-end">
      <p class="text-xs text-gray-500">{{ quantity }} x {{ formatCurrency(unitPrice) }} = <span class="font-semibold text-slate-800">{{ formatCurrency(quantity * unitPrice) }}</span></p>
    </div>
  </div>
</template>
