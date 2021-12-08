import * as Yup from 'yup'
import { TPaymentMethod } from './createTicket.dto'

export const createTicketReqValidation = Yup.object({
  payment_id: Yup.string().required(),
  transactionState: Yup.number().required(),
  terminalId: Yup.string().required(),
  payment_type: Yup.mixed<TPaymentMethod>()
    .oneOf(['cash', 'card', 'webpay'])
    .required(),
})

export const createTicketResValidation = Yup.object({
  id: Yup.string().required(),
  ecv: Yup.string().required(),
  employee: Yup.string().required(),
  extension: Yup.boolean().required(),
  udr: Yup.number().required(),
  price: Yup.number().required(),
  state: Yup.string().required(),
  parking_end: Yup.string().required(),
  ticket_id_parksys: Yup.string(),
  meta: Yup.object(),
})
