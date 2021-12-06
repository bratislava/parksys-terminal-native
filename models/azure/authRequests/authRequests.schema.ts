import * as Yup from 'yup'

/**========================================================================
 **                          Login
 *========================================================================**/

export const loginReqValidation = Yup.object({
  client_id: Yup.string().required(),
  scope: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required(),
  grant_type: Yup.string().oneOf(['password']).required(),
})

export const loginResValidation = Yup.object({
  token_type: Yup.string().required(),
  scope: Yup.string().required(),
  expires_in: Yup.number().required(),
  ext_expires_in: Yup.number().required(),
  access_token: Yup.string().required(),
  refresh_token: Yup.string().required(),
})

/**========================================================================
 **                          Refresh
 *========================================================================**/

export const refreshReqValidation = Yup.object({
  grant_type: Yup.string().oneOf(['refresh_token']).required(),
  refresh_token: Yup.string().required(),
  client_id: Yup.string().required(),
})
