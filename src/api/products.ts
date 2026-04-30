import client from './client'
import type { Product } from '@/types/product'

export const getProducts = (params?: { search?: string; category?: string }) =>
  client.get<Product[]>('/products', { params }).then((res) => res.data)

export const getProduct = (id: string) =>
  client.get<Product>(`/products/${id}`).then((res) => res.data)
