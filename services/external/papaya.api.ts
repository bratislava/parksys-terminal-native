import { ISetupTerminalReqParams } from './../../models/papaya/setupTerminal/setupTerminal.d'
import papayaApi from '@lib/api/papayaApi'
import { getReceiptReqValidation } from '@models/papaya/receipt/receipt.schema'
import type {
  IGetReceiptReqData,
  IGetReceiptRes,
} from '@models/papaya/receipt/receipt.dto'
import type {
  TPrintRequestData,
  TPrintResponseData,
} from '@models/papaya/print/print.dto'
import {
  printReqValidation,
  printResValidation,
} from '@models/papaya/print/print.schema'
import { ICashReqParams, ICashResponse } from '@models/papaya/cash/cash.dto'
import {
  cashPaymentReqValidation,
  cashPaymentResValidation,
} from '@models/papaya/cash/cash.schema'
import { ICardPaymentReq, ICardPaymentRes } from '@models/papaya/card/card.dto'
import {
  cardPaymentReqValidation,
  cardPaymentResValidation,
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
 * ! Ekasa is necessary, don't use
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
  return papayaApi.requestValidate<ICardPaymentRes>(
    '/api/terminal/pay',
    {
      method: 'POST',
      data: params,
    },
    cardPaymentReqValidation,
    cardPaymentResValidation
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
