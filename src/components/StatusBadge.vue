<script setup lang="ts">
import { statusClass } from '@/utils/format'

defineProps<{
  status: string
}>()
</script>

<template>
  <span class="inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium capitalize" :class="statusClass(status)">
    {{ status }}
  </span>
</template>
