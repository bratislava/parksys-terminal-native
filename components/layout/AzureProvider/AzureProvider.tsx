import useAzureAuth from '@hooks/useAzureAuth'
import { AuthContextProvider } from '@lib/context/authContext'
import * as React from 'react'

/**
 * Provider of auth info in app
 * It provides user profile, if logged in
 * Wrap navigator with this
 */
const AzureProvider: React.FunctionComponent = ({ children }) => {
  const authContext = useAzureAuth()

  console.log(authContext.tokens?.accessToken)

  return (
    <AuthContextProvider value={authContext}>{children}</AuthContextProvider>
  )
}

export default AzureProvider
