import * as Yup from 'yup'

export const getTicketReqValidation = Yup.object({
  partnerId: Yup.string().required(),
  terminalId: Yup.string().required(),
  udr: Yup.string().required(),
  parkingEnd: Yup.string().required(),
  ecv: Yup.string().required(),
})

export const getTicketResValidation = Yup.object({
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
  payment_id: Yup.string().required(),
})
