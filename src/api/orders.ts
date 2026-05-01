import client from './client'
import type { Order, CreateOrderPayload } from '@/models/order'
import type { ApiResponseWithPagination } from '@/models/common'

export const getOrders = async (params?: { status?: string; page?: number }): Promise<ApiResponseWithPagination<Order>> => {
  const response = await client.get<ApiResponseWithPagination<Order>>('/orders', { params })
  return response.data
}

export const getOrder = async (id: string): Promise<Order> => {
  const response = await client.get<Order>(`/orders/${id}`)
  return response.data
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const response = await client.post('/orders', payload)
  return response.data
}
