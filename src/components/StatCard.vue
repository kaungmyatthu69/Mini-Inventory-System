<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  label: string
  value: string | number
  iconClass: string
  bgClass: string
}>()
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5">
    <div class="flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl" :class="bgClass">
        <component :is="icon" class="h-5 w-5" :class="iconClass" />
      </div>
      <div>
        <p class="text-xs text-gray-500">{{ label }}</p>
        <p class="text-xl font-bold text-slate-800">{{ value }}</p>
      </div>
    </div>
  </div>
</template>
