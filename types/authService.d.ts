import { JwtPayload } from 'jwt-decode'

export interface IAuthSession {
  accessToken: string
  refreshToken: string
}

export type TListener = (
  session: IAuthSession | null,
  decoded: JwtPayload | null
) => void
