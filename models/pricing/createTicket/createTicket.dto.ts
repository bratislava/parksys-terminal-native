import { TTicketState } from '../pricing.d'

export type TPaymentMethod = 'cash' | 'card' | 'webpay'
export interface ICreateTicketReqParams {
  payment_id: string
  transactionState: number
  terminalId: string
  payment_type: TPaymentMethod
}

export interface ICreateTicketRes {
  id: string
  created_at: string
  updated_at: string
  meta: Meta
  ecv: string
  udr: number
  price: number
  state: TTicketState
  extension: boolean
  parent: string
  payment_id: string
  employee: string
  partner_id: string
  parking_end: string
  ticket_id_parksys: string
}

export interface Meta {}
