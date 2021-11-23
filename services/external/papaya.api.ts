import papayaApi from '@lib/api/papayaApi'
import { getReceiptReqValidation } from '@models/papaya/receipt/receipt.schema'
import type {
  IGetReceiptReqData,
  IGetReceiptRes,
} from '@models/papaya/receipt/receipt'
import type {
  TPrintRequestData,
  TPrintResponseData,
} from '@models/papaya/print/print.d'
import {
  printReqValidation,
  printResValidation,
} from '@models/papaya/print/print.schema'

/**
 * Print receipt from terminal
 * https://github.com/papayapos/ekasa/blob/main/docs/CustomPrintApi.md#Print
 * @param data data to send to terminal
 * @throws AxiosError or ValidationError
 * @returns promise
 */
export function printReceipt(data: TPrintRequestData) {
  return papayaApi.requestValidate<TPrintResponseData>(
    '/api/print',
    {
      method: 'POST',
      data,
    },
    printReqValidation,
    printResValidation
  )
}

/**
 * Function to get receipt from terminal
 * https://github.com/papayapos/ekasa/blob/main/docs/DocumentApiGet.md#GetDocument
 * @param data data to specify printer
 * @throws AxiosError or ValidationError
 * @returns promise
 */
export function getReceipts(data: IGetReceiptReqData) {
  return papayaApi.requestValidate<IGetReceiptRes>(
    '/api/document/get',
    {
      method: 'POST',
      data,
    },
    getReceiptReqValidation
  )
}
