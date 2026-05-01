import { z } from 'zod'

// Schemas
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        product_id: z.string().min(1, 'Product is required'),
        quantity: z.number().int().min(1, 'Quantity must be at least 1'),
      }),
    )
    .min(1, 'Add at least one product'),
})

export type CreateOrderPayload = z.infer<typeof createOrderSchema>

// Types — matches API response


export interface OrderProduct {
  id: string
  product_id: string
  product_name: string
  quantity: number
  price: number
  subtotal: string
}

export interface Order {
  id: string
  user_id: string
  total_price: number
  order_status: 'pending' | 'completed' | 'cancelled' | 'refunded'
  created_at: string
  products: OrderProduct[]
}
