import { Asserts } from 'yup'
import { getReceiptReqValidation } from './receipt.schema'

export type IGetReceiptReqData = Asserts<typeof getReceiptReqValidation>

// Generated by https://quicktype.io

export interface IGetReceiptRes {
  document: Document
}

export interface Document {
  amount: number
  cashRegisterCode: string
  createDate: string
  customer: Customer
  documentEntries: DocumentEntry[]
  electronic: boolean
  exception: boolean
  footer: string
  header: string
  internalDocumentId: number
  isParagon: boolean
  issueDate: string
  merchant: Merchant
  okp: string
  pkp: string
  processDate: string
  qrCode: string
  sendingCount: number
  sequenceId: number
  type: string
  uuid: string
  vatRateSums: VatRateSum[]
}

export interface Customer {}

export interface DocumentEntry {
  name: string
  price: number
  quantity: number
  seller: Customer
  totalPrice: number
  type: string
  vatRate: string
  voucherNumber?: string
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

export interface VatRateSum {
  base: number
  sum: number
  title: string
  vat: number
}
