import type { Order } from './order'
import type { Product } from './product'

export interface DashboardData {
  total_products: number
  total_orders: number
  revenue: number
  low_stock: number
  recent_orders: Order[]
  low_stock_alerts: Product[]
}
