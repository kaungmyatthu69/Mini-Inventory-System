<script setup lang="ts">
defineProps<{
  title: string
  emptyText: string
  items: unknown[]
}>()
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white">
    <div class="border-b border-gray-100 px-5 py-4">
      <h2 class="text-sm font-semibold text-gray-700">{{ title }}</h2>
    </div>
    <div v-if="items.length === 0" class="p-6 text-center text-sm text-gray-400">
      {{ emptyText }}
    </div>
    <div v-else class="divide-y divide-gray-100">
      <slot />
    </div>
  </div>
</template>
