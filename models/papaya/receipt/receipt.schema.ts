import * as Yup from 'yup'

export const getReceiptReqValidation = Yup.object({
  printer: Yup.object({}).default({}),
})
