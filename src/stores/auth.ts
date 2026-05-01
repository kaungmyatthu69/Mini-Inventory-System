import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, AuthResponse } from '@/models/auth'

function loadUser(): User | null {
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<User | null>(loadUser())

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(authResponse: AuthResponse) {
    token.value = authResponse.token
    user.value = authResponse.user
    localStorage.setItem('token', authResponse.token)
    localStorage.setItem('user', JSON.stringify(authResponse.user))
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, isAuthenticated, setAuth, logout }
})
