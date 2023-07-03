import useAzureAuth from '@hooks/useAzureAuth'
import { AuthContextProvider } from '@lib/context/authContext'
import * as React from 'react'

/**
 * Provider of auth info in app
 * It provides user profile, if logged in
 * Wrap navigator with this
 */

type AzureProviderProps = {
  children: React.ReactNode
}
const AzureProvider = ({ children }: AzureProviderProps) => {
  const authContext = useAzureAuth()

  return (
    <AuthContextProvider value={authContext}>{children}</AuthContextProvider>
  )
}

export default AzureProvider
