export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderPayload {
  items: { productId: string; quantity: number }[]
}
