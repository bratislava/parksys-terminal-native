import { withPaginationValidation } from '@models/pagination/pagination.schema'
import * as Yup from 'yup'

export const getTicketsReqValidation = Yup.object({
  ecv: Yup.string(),
  state: Yup.string(),
  udr: Yup.string(),
  parking_end: Yup.string(),
  last_parking_end: Yup.string(),
  currentPage: Yup.number().required(),
  pageSize: Yup.number().required(),
  employee: Yup.string().required(),
})

export const ticketsItemValidation = Yup.object({
  id: Yup.string().required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required(),
  meta: Yup.object(),
  ecv: Yup.string().required(),
  udr: Yup.string().required(),
  price: Yup.number().required(),
  state: Yup.string().required(),
  message: Yup.string().required(),
  extension: Yup.boolean().required(),
  parent: Yup.string().required(),
  payment_id: Yup.string().required(),
  employee: Yup.string().required(),
  partner_id: Yup.string().required(),
  parking_end: Yup.string().required(),
  ticket_id_parksys: Yup.string().required(),
})

export const getTicketsResValidation = withPaginationValidation(
  ticketsItemValidation
)
