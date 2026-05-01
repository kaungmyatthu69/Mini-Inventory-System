import client from './client'
import type { Product } from '@/models/product'
import type { ApiResponseWithPagination } from '@/models/common'

export const getProducts = async (params?: { search?: string; category?: string; page?: number }): Promise<ApiResponseWithPagination<Product>> => {
  const response = await client.get<ApiResponseWithPagination<Product>>('/products', { params })
  return response.data
}
