/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { TTicketState } from '@models/pricing/pricing'
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
  PaymentStatus: {
    type: 'success' | 'error'
    state: TTicketState
    id: string
  }
}

export type AuthStackParamList = {
  Login: undefined
}
