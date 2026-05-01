import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { login as loginApi } from '@/api/auth'
import { register as registerApi } from '@/api/auth'
import type { LoginPayload, RegisterPayload } from '@/models/auth'

export function useAuth() {
  const router = useRouter()
  const auth = useAuthStore()

  async function login(payload: LoginPayload) {
    const response = await loginApi(payload)
    auth.setAuth(response)
    router.push({ name: 'dashboard' })
  }

  async function register(payload: RegisterPayload) {
    const response = await registerApi(payload)
    auth.setAuth(response)
    router.push({ name: 'dashboard' })
  }

  function logout() {
    auth.logout()
    router.push({ name: 'login' })
  }

  return { login, register, logout }
}
