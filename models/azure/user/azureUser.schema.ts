import * as Yup from 'yup'

export const azureUserResValidation = Yup.object({
  businessPhones: Yup.array(),
  displayName: Yup.string().required(),
  givenName: Yup.string().nullable(),
  jobTitle: Yup.string().nullable(),
  mail: Yup.string().required(),
  mobilePhone: Yup.string().nullable(),
  officeLocation: Yup.string().nullable(),
  preferredLanguage: Yup.string().nullable(),
  surname: Yup.string().nullable(),
  userPrincipalName: Yup.string().required(),
  id: Yup.string().required(),
})
