import client from './client'
import type { ApiResponseWithStatus } from '@/models/common'
import type { DashboardData } from '@/models/dashboard'

export const getDashboard = async (): Promise<ApiResponseWithStatus<DashboardData>> => {
  const response = await client.get('/dashboard')
  return response.data
}
