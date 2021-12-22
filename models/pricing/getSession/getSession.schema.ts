import * as Yup from 'yup'

export const getSessionResValidation = Yup.object({
  id: Yup.string().required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required(),
  meta: Yup.object().nullable(),
  employee: Yup.string().required(),
  price_cash: Yup.number().required(),
  price_card: Yup.number().required(),
  transactions: Yup.number().required(),
  closed: Yup.boolean().required(),
})
