/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { ITicketHistoryItem } from '@models/pricing/getTickets/getTickets.dto'
import { IUdrInfo } from '@models/pricing/udr/udr.d'

export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type TOneStackParamList = {
  EnterParkingInfo: undefined
  ParkingOrderSummary: {
    udr: IUdrInfo
    ecv: string
    parkingEnd: string
  }
}

export type AuthStackParamList = {
  Login: undefined
}

export type HistoryStackParamList = {
  TransactionsHistory: undefined
  TransactionDetail: {
    item: ITicketHistoryItem
  }
}
