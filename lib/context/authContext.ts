import { IAuthSession } from './../../types/authService.d'
import { IAzureProfile } from '@models/azure/user/azureUser'
import authService from '@services/internal/auth.service'
import * as React from 'react'

export interface IAuthContext {
  tokens?: IAuthSession
  profile?: IAzureProfile
  loggedIn: boolean
  login: typeof authService.authenticate
  logout: typeof authService.revokeTokens
}

export const defaultValue: IAuthContext = {
  loggedIn: false,
  login: async () => {
    throw new Error()
  },
  logout: async () => {
    return
  },
}

export const authContext = React.createContext<IAuthContext>(defaultValue)
export const AuthContextProvider = authContext.Provider
export const useAuthContext = () => React.useContext(authContext)
