import useAzureAuth from '@hooks/useAzureAuth'
import { AuthContextProvider } from '@lib/context/authContext'
import { getUserProfile } from '@services/external/azure.api'
import * as React from 'react'
import { useQuery } from 'react-query'

/**
 * Provider of auth info in app
 * It provides user profile, if logged in
 * Wrap navigator with this
 */
const AzureProvider: React.FunctionComponent = ({ children }) => {
  const authContext = useAzureAuth()

  const fetchUser = React.useCallback(async () => {
    if (authContext.loggedIn) {
      const user = await getUserProfile()
      return user
    }
    return undefined
  }, [authContext.loggedIn])

  const { data: profile } = useQuery(
    ['azure-user', authContext.tokens?.accessToken, authContext.loggedIn],
    fetchUser
  )

  const authValue = React.useMemo(
    () => ({ ...authContext, profile }),
    [authContext, profile]
  )

  return <AuthContextProvider value={authValue}>{children}</AuthContextProvider>
}

export default AzureProvider
