import { PaginatedResult } from '@models/pagination/pagination'
import { TTicketState } from '../pricing'

export interface ITicketsReqParams {
  ecv?: string
  state?: string
  udr?: string
  parking_end?: string
  last_parking_end?: string
  currentPage: number
  pageSize: number
  employee: string
}

export interface ITicketHistoryItem {
  id: string
  created_at: string
  updated_at: string
  meta: Meta
  ecv: string
  udr: number
  price: number
  state: TTicketState
  message: string
  extension: boolean
  parent: string
  payment_id: string
  employee: string
  partner_id: string
  parking_end: string
  ticket_id_parksys: string
  payment_type: 'card' | 'cash'
}

export interface Meta {}

export type ITickets = PaginatedResult<ITicketHistoryItem>
