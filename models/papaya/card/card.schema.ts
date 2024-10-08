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
import * as Yup from 'yup'

export const requestContentValidation = Yup.object({
  operation: Yup.string().oneOf(['CP', 'CC', 'CR']),
  amount: Yup.string(),
  transactionId: Yup.string(),
  hostTransId: Yup.string(),
})

export const cardPaymentReqValidation = Yup.object({
  externalId: Yup.string(),
  requestContents: requestContentValidation,
  printCustomerReceipt: Yup.boolean(),
  printMerchantReceipt: Yup.boolean(),
})

export const cardPaymentResValidation = Yup.object({
  content: Yup.object({
    result: Yup.string().required(),
    customerReceipt: Yup.string().required(),
    merchantReceipt: Yup.string().required(),
  }),
  status: Yup.object({
    code: Yup.number().required(),
  }),
  success: Yup.boolean().required(),
})
