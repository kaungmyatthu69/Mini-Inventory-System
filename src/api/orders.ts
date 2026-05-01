import client from './client'
import type { Order, CreateOrderPayload } from '@/models/order'

export const getOrders = (params?: { status?: string }) =>
  client.get<Order[]>('/orders', { params }).then((res) => res.data)

export const getOrder = (id: string) =>
  client.get<Order>(`/orders/${id}`).then((res) => res.data)

export const createOrder = (payload: CreateOrderPayload) =>
  client.post<Order>('/orders', payload).then((res) => res.data)
