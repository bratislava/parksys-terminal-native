/*
 * File: cash.schema.ts
 * Project: parking-native
 * Created Date: 29-11-2021
 * Author: Boris Nanista
 * -----
 * Last Modified: Mon Nov 29 2021
 * Modified By: Boris Nanista
 * ----------------------------------------------------------------------
 * https://github.com/papayapos/ekasa/blob/main/docs/CashApi.md#CashRequest
 */

import * as Yup from 'yup'

/**========================================================================
 **                       Cash payment request
 *========================================================================**/

export const cashPaymentReqValidation = Yup.object({
  externalId: Yup.string(),
  amount: Yup.number().required(),
  footer: Yup.string(),
  exception: Yup.boolean(),
})

/**------------------------------------------------------------------------
 **                      Cash payment response
 *------------------------------------------------------------------------**/

export const cashPaymentResValidation = Yup.object({
  warning: Yup.string(),
  errorMessage: Yup.string(),
  cash: Yup.object(),
})
