<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Smartphone, Type, Loader2 } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { useZodForm } from '@/composables/useZodForm'
import { registerSchema } from '@/models/auth'
import { getErrorMessage } from '@/utils/format'

const { register } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const loading = ref(false)
const { errors, validate } = useZodForm(registerSchema)

async function handleSubmit() {
  if (!validate({ name: name.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value })) return

  loading.value = true
  errorMsg.value = ''

  try {
    await register({ name: name.value, email: email.value, password: password.value })
  } catch (err: unknown) {
    errorMsg.value = getErrorMessage(err, 'Registration failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f8f9fa] p-4">
    <div class="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-lg">
      <!-- Left panel — form -->
      <div class="w-full lg:w-1/2 p-10">
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">Create Account</p>
        <h2 class="mt-2 text-2xl font-bold text-slate-800">Register for inventory control</h2>
        <p class="mt-1 text-sm text-gray-500">Make your workspace more organized with a clean, modern signup experience.</p>

        <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
          <div
            v-if="errorMsg"
            class="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600"
          >
            {{ errorMsg }}
          </div>

          <div>
            <label for="name" class="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Jane Doe"
              class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-500/20': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
          </div>

          <div>
            <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-500/20': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-500/20': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="mb-1.5 block text-sm font-medium text-gray-700">Confirm password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              class="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-500/20': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-xs text-red-500">{{ errors.confirmPassword }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="h-11 w-full rounded-xl bg-slate-800 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span class="flex items-center justify-center gap-2">
              <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
              {{ loading ? 'Creating account...' : 'Create Account' }}
            </span>
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-500">
          Already have an account?
          <RouterLink to="/login" class="font-medium text-slate-800 hover:text-slate-600">Sign In</RouterLink>
        </p>
      </div>

      <!-- Right panel — onboarding -->
      <div class="hidden lg:flex w-1/2 flex-col justify-center bg-slate-50 p-10">
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">Elegant Onboarding</p>
        <h3 class="mt-2 text-xl font-bold text-slate-700">A calm signup flow for new users</h3>
        <p class="mt-3 text-sm leading-relaxed text-gray-500">
          This page is designed to feel welcoming and easy to use, with clean fields and gentle spacing.
        </p>

        <div class="mt-8 space-y-4">
          <div class="flex items-center gap-4">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white">
              <Smartphone class="h-4 w-4" />
            </div>
            <p class="text-sm text-gray-600">Responsive layout for both desktop and mobile.</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white">
              <Type class="h-4 w-4" />
            </div>
            <p class="text-sm text-gray-600">Soft accent styling with calm, readable typography.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
