import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const base = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const version = import.meta.env.VITE_API_VERSION

const client = axios.create({
  baseURL: version ? `${base}/${version}` : base,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url ?? ''
      if (!url.includes('/login') && !url.includes('/register')) {
        const auth = useAuthStore()
        auth.logout()
        router.push({ name: 'login' })
      }
    }
    return Promise.reject(error)
  },
)

export default client
