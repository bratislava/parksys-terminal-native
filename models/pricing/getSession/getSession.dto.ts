export interface ISession {
  id: string
  created_at: string
  updated_at: string
  meta: Meta
  employee: string
  price_cash: number
  price_card: number
  transactions: number
  closed: boolean
}

export interface Meta {}
