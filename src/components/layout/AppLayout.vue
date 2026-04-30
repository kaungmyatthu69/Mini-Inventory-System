<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 p-4">
      <h1 class="text-xl font-bold text-gray-800 mb-8">Inventory</h1>

      <nav class="flex flex-col gap-1">
        <RouterLink
          to="/dashboard"
          class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-gray-100 text-gray-900"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/products"
          class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-gray-100 text-gray-900"
        >
          Products
        </RouterLink>
        <RouterLink
          to="/orders"
          class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-gray-100 text-gray-900"
        >
          Orders
        </RouterLink>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Top bar -->
      <header class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
        <span class="text-sm text-gray-500">
          {{ auth.user?.name || 'User' }}
        </span>
        <button
          class="text-sm text-gray-500 hover:text-gray-700"
          @click="auth.logout()"
        >
          Logout
        </button>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
