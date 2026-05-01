import client from './client'
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/models/auth'
import type { ApiResponseWithStatus } from '@/models/common'

export const login = async (payload: LoginPayload): Promise<ApiResponseWithStatus<AuthResponse>> => {
  const response = await client.post<ApiResponseWithStatus<AuthResponse>>('/login', payload)
  return response.data
}

export const register = async (payload: RegisterPayload): Promise<ApiResponseWithStatus<AuthResponse>> => {
  const response = await client.post<ApiResponseWithStatus<AuthResponse>>('/register', payload)
  return response.data
}
