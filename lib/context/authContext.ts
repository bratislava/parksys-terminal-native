import { useAuthRequest } from 'expo-auth-session'
import * as React from 'react'

type TAuthHook = ReturnType<typeof useAuthRequest>

export interface IAuthContext {
  request: TAuthHook[0]
  result: TAuthHook[1]
  promptAsync: TAuthHook[2]
  loggedIn: boolean
}

export const defaultValue: IAuthContext = {
  request: null,
  result: null,
  promptAsync: async () => {
    return { type: 'cancel' }
  },
  loggedIn: false,
}

export const authContext = React.createContext<IAuthContext>(defaultValue)
export const AuthContextProvider = authContext.Provider
export const useAuthContext = () => React.useContext(authContext)
