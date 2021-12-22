/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { IParkinPriceResData } from '@models/pricing/parkingPrice/parkingPrice.dto'
import { ITicketHistoryItem } from '@models/pricing/getTickets/getTickets.dto'
import { IUdrInfo } from '@models/pricing/udr/udr.d'

export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
  SessionClose: undefined

  EnterParkingInfo: undefined
  ParkingOrderSummary: {
    udr: IUdrInfo
    ecv: string
    parkingEnd: string
  }
  PayByCash: {
    udr: IUdrInfo
    ecv: string
    parkingEnd: string
    finalPrice: IParkinPriceResData
  }
  PayByCard: {
    udr: IUdrInfo
    ecv: string
    parkingEnd: string
    finalPrice: IParkinPriceResData
  }
  ParkinOrderPaymentType: {
    udr: IUdrInfo
    ecv: string
    parkingEnd: string
    finalPrice: IParkinPriceResData
  }

  TransactionsHistory: undefined
  TransactionDetail: {
    item: ITicketHistoryItem
  }

  Settings: undefined
  Home: undefined
}

export type AuthStackParamList = {
  Login: undefined
}
