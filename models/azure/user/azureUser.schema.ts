import * as Yup from 'yup'

export const azureUserResValidation = Yup.object({
  displayName: Yup.string().required(),
  mail: Yup.string().required(),
  id: Yup.string().required(),
})
