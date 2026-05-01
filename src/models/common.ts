export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

export interface ApiResponseWithStatus<T> {
  status: string
  message: string
  data: T
}

export interface ApiResponseWithPagination<T> {
  status: string
  message: string
  data: {
    items: T[]
    pagination: PaginationMeta
  }
}
