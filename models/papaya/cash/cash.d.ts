/*
 * File: cash.d.ts
 * Project: parking-native
 * Created Date: 29-11-2021
 * Author: Boris Nanista
 * -----
 * Last Modified: Mon Nov 29 2021
 * Modified By: Boris Nanista
 * ----------------------------------------------------------------------
 */

import { EKasaStatus } from '@models/ekasa/eKasa.d'

/**========================================================================
 **                       Cash payment request
 *========================================================================**/

export interface ICashReqParams {
  externalId: string
  amount: number
  footer: string
  exception: boolean
}

/**------------------------------------------------------------------------
 **                      Cash payment response
 *------------------------------------------------------------------------**/

export interface ICashResponse {
  cash?: Cash
  warning?: string
  errorMessage?: string
}

export interface Cash {
  amount: number
  cashRegisterCode: string
  createDate: string
  electronic: boolean
  electronicReceipt: string
  exception: boolean
  footer: string
  issueDate: string
  merchant: Merchant
  okp: string
  pkp: string
  processDate: string
  qrCode: string
  sendingCount: number
  sequenceId: number
  uuid: string
  status: EKasaStatus
}

export interface Merchant {
  corporateFullName: string
  dic: string
  icDph: string
  ico: string
  id: number
  organizationUnit: OrganizationUnit
  physicalAddress: PhysicalAddress
}

export interface OrganizationUnit {
  cashRegisterCode: string
  cashRegisterType: string
  location: Location
  name: string
}

export interface Location {
  physicalAddress: PhysicalAddress
}

export interface PhysicalAddress {
  buildingNumber: string
  country: string
  municipality: string
  postalCode: string
  propertyRegistrationNumber: string
  street: string
}
