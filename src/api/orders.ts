import client from './client'
import type { Order, CreateOrderPayload } from '@/models/order'
import type { ApiResponseWithPagination, ApiResponseWithStatus } from '@/models/common'

export const getOrders = async (params?: { status?: string; page?: number }): Promise<ApiResponseWithPagination<Order>> => {
  const response = await client.get<ApiResponseWithPagination<Order>>('/orders', { params })
  return response.data
}

export const getOrder = async (id: string): Promise<ApiResponseWithStatus<Order>> => {
  const response = await client.get<ApiResponseWithStatus<Order>>(`/orders/${id}`)
  return response.data
}

export const createOrder = async (payload: CreateOrderPayload): Promise<ApiResponseWithStatus<Order>> => {
  const response = await client.post<ApiResponseWithStatus<Order>>('/orders', payload)
  return response.data
}
