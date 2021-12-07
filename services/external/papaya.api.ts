import { ISetupTerminalReqParams } from './../../models/papaya/setupTerminal/setupTerminal.d'
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
import { ICashReqParams, ICashResponse } from '@models/papaya/cash/cash.d'
import {
  cashPaymentReqValidation,
  cashPaymentResValidation,
} from '@models/papaya/cash/cash.schema'
import { ICardPaymentReq } from '@models/papaya/card/card'
import {
  cardPaymentReqValidation,
  requestContentValidation,
} from '@models/papaya/card/card.schema'
import {
  setupTerminalReqValidation,
  setupTerminalResValidation,
} from '@models/papaya/setupTerminal/setupTerminal'

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
    { method: 'POST', data },
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
    { method: 'POST', data },
    getReceiptReqValidation
  )
}

/**
 * PrintReceipt for cash payment
 * @param params params to print
 * @returns promise
 */
export function payByCash(params: ICashReqParams) {
  return papayaApi.requestValidate<ICashResponse>(
    '/api/cash',
    {
      method: 'POST',
      data: params,
    },
    cashPaymentReqValidation,
    cashPaymentResValidation
  )
}

export function payByCard(params: ICardPaymentReq) {
  return papayaApi.requestValidate(
    '/api/terminal/pay',
    {
      method: 'POST',
      data: params,
    },
    requestContentValidation,
    cardPaymentReqValidation
  )
}

/**
 * Get/set terminal settings
 * @param data settings
 * @returns promise with settings
 */
export function setupTerminal(data: ISetupTerminalReqParams) {
  return papayaApi.requestValidate(
    '/api/setup',
    { method: 'POST', data },
    setupTerminalReqValidation,
    setupTerminalResValidation
  )
}
