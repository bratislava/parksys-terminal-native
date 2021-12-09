export interface IPaginationMeta {
  total: number
  currentPage: number
  pageSize: number
}

export interface PaginatedResult<T> {
  items: T[]
  pagination: IPaginationMeta
}
