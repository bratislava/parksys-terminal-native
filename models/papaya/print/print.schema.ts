import * as Yup from 'yup'

export const printReqValidation = Yup.object({
  printer: Yup.object({}).required().default({}),
  printData: Yup.string().required().default(''),
})
  .strict()
  .noUnknown()

export const printResValidation = Yup.object({
  rawData: Yup.string().required(),
  warning: Yup.object(),
  errorMessage: Yup.string(),
})
