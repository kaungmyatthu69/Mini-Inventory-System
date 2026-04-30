import client from './client'
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/auth'

export const login = (payload: LoginPayload) =>
  client.post<AuthResponse>('/auth/login', payload).then((res) => res.data)

export const register = (payload: RegisterPayload) =>
  client.post<AuthResponse>('/auth/register', payload).then((res) => res.data)

export const getMe = () =>
  client.get<{ user: User }>('/auth/me').then((res) => res.data.user)
