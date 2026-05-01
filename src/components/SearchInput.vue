<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  delay?: number
  size?: 'sm' | 'md'
}>(), {
  placeholder: 'Search...',
  delay: 500,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const raw = ref(props.modelValue)
let timer: ReturnType<typeof setTimeout>

watch(() => props.modelValue, (val) => {
  if (val !== raw.value) raw.value = val
})

function onInput(value: string) {
  raw.value = value
  clearTimeout(timer)
  timer = setTimeout(() => emit('update:modelValue', value), props.delay)
}
</script>

<template>
  <div class="relative flex-1">
    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    <input
      :value="raw"
      type="text"
      :placeholder="placeholder"
      :class="size === 'sm'
        ? 'h-9 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
        : 'h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
      "
      @input="onInput(($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
