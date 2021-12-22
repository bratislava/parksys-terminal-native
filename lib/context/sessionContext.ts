import * as React from 'react'
import { ISession } from './../../models/pricing/getSession/getSession.dto'

export interface ISessionContext {
  session: ISession | undefined
  getSession: () => Promise<ISession | null | undefined>
  sessionLoading: boolean
  sessionError: unknown | null
}

export const defaultValue: ISessionContext = {
  session: undefined,
  getSession: async () => {
    return null
  },
  sessionLoading: false,
  sessionError: null,
}

export const sessionContext = React.createContext<ISessionContext>(defaultValue)
export const SessionContextProvider = sessionContext.Provider
export const useSessionContext = () => React.useContext(sessionContext)
