import useAzureAuth from '@hooks/useAzureAuth'
import { AuthContextProvider } from '@lib/context/authContext'
import * as React from 'react'

/**
 * Provider of auth info in app
 * Wrap navigator with this
 */
const AzureProvider: React.FunctionComponent = ({ children }) => {
  const { request, result, promptAsync, loggedIn } = useAzureAuth()

  const authValue = React.useMemo(
    () => ({ request, result, promptAsync, loggedIn }),
    [request, result, promptAsync, loggedIn]
  )

  return <AuthContextProvider value={authValue}>{children}</AuthContextProvider>
}

export default AzureProvider
