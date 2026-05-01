import client from './client'
import type { Category } from '@/models/category'
import type { ApiResponseWithPagination } from '@/models/common'

export const getCategories = async (params?: { page?: number }): Promise<ApiResponseWithPagination<Category>> => {
  const response = await client.get<ApiResponseWithPagination<Category>>('/categories', { params })
  return response.data
}
