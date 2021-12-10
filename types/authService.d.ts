import { JwtPayload } from 'jwt-decode'

export interface IAuthSession {
  accessToken: string
  refreshToken: string
}

export type TListener = (
  session: IAuthSession | null,
  decoded: IAzureToken | null
) => void

export interface IAzureToken extends JwtPayload {
  oid: string
  name: string
  preferred_username: string
}
