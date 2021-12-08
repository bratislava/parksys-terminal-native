import * as Yup from 'yup'

export const createTicketReqValidation = Yup.object({
  payment_id: Yup.string().required(),
  transactionState: Yup.number().required(),
  terminalId: Yup.string().required(),
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
