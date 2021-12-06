/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { udrInfo } from '@models/pricing/udr/udr.d'

export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type TOneStackParamList = {
  EnterParkingInfo: undefined
  ParkingOrderSummary: {
    udr: udrInfo
    ecv: string
    parkingEnd: string
  }
}

export type AuthStackParamList = {
  Login: undefined
}
