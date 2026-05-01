<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { Package, LayoutGrid, ClipboardList, LogOut } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'

const { logout } = useAuth()
const auth = useAuthStore()
</script>

<template>
  <div class="flex min-h-screen bg-[#f8f9fa]">
    <!-- Sidebar -->
    <aside class="flex w-64 flex-col bg-white border-r border-gray-200">
      <!-- Brand -->
      <div class="flex items-center gap-3 px-6 py-6">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800">
          <Package class="h-5 w-5 text-white" />
        </div>
        <span class="text-lg font-bold text-slate-800">Inventory</span>
      </div>

      <!-- Nav -->
      <nav class="mt-2 flex flex-1 flex-col gap-1 px-3">
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-white [&.router-link-active]:bg-slate-800 [&.router-link-active]:text-white [&.router-link-active]:hover:bg-slate-700"
        >
          <LayoutGrid class="h-5 w-5" />
          Dashboard
        </RouterLink>
        <RouterLink
          to="/products"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-white [&.router-link-active]:bg-slate-800 [&.router-link-active]:text-white [&.router-link-active]:hover:bg-slate-700"
        >
          <Package class="h-5 w-5" />
          Products
        </RouterLink>
        <RouterLink
          to="/orders"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-white [&.router-link-active]:bg-slate-800 [&.router-link-active]:text-white [&.router-link-active]:hover:bg-slate-700"
        >
          <ClipboardList class="h-5 w-5" />
          Orders
        </RouterLink>
      </nav>

      <!-- User section -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
            {{ auth.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="truncate text-sm font-medium text-gray-900">{{ auth.user?.name || 'User' }}</p>
            <p class="truncate text-xs text-gray-400">{{ auth.user?.email || '' }}</p>
          </div>
          <button
            class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            title="Logout"
            @click="logout()"
          >
            <LogOut class="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex flex-1 flex-col">
      <!-- Top bar -->
      <header class="border-b border-gray-200 bg-white px-8 py-5">
        <p class="text-sm text-gray-500">Welcome back, <span class="font-medium text-gray-800">{{ auth.user?.name || 'User' }}</span></p>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
