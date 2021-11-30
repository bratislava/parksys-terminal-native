/*
 * File: card.schema.ts
 * Project: parking-native
 * Created Date: 29-11-2021
 * Author: Boris Nanista
 * -----
 * Last Modified: Mon Nov 29 2021
 * Modified By: Boris Nanista
 * ----------------------------------------------------------------------
 */

/**
 * Operation identifier. CP for payment, CC for cancel, CR for refund
 */
export type TOperation = 'CP' | 'CC' | 'CR'

export interface ICardPaymentReq {
  externalId?: string
  requestContents?: RequestContents
  printCustomerReceipt?: boolean
  printMerchantReceipt?: boolean
}

export interface RequestContents {
  operation?: TOperation
  amount?: string
  transactionId?: string
  hostTransId?: string
}
