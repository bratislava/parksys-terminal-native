/**========================================================================
 **                          Login
 *========================================================================**/

export interface ILoginReqParams {
  client_id: string
  scope: string
  username: string
  password: string
  grant_type: 'password'
}

export interface ILoginRes {
  token_type: string
  scope: string
  expires_in: number
  ext_expires_in: number
  access_token: string
  refresh_token: string
}

/**========================================================================
 **                          Refresh
 *========================================================================**/

export interface IRefreshReqParams {
  grant_type: 'refresh_token'
  refresh_token: string
  client_id: string
}
