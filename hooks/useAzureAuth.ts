import authService, { TListener } from '@services/internal/auth.service'
import Constants from 'expo-constants'
import * as React from 'react'
import * as AuthSession from 'expo-auth-session'

const useProxy = true

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'your.app',
  useProxy,
})

/**
 * Hook to auth user with Azure Login
 * Use this only once in app
 * @returns auth functions
 */
function useAzureAuth() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  // Endpoint
  const discovery = AuthSession.useAutoDiscovery(
    `https://login.microsoftonline.com/${Constants.manifest?.extra?.azureTenantId}/v2.0`
  )
  // Request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Constants.manifest?.extra?.azureClientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri,
    },
    discovery
  )

  /**
   * Handle tokens form auth
   */
  const handleAuthResponse = React.useCallback(async () => {
    if (result?.type === 'success') {
      await authService.setSession(result.params)
    }
  }, [result])

  /**
   * Load tokens from storage, and log in user if token is not expired
   */
  const initAuth = React.useCallback(async () => {
    const tokens = await authService.getTokens()

    if (tokens) {
      if (tokens.accessToken && !tokens.shouldRefresh()) {
        setLoggedIn(true)
      }
    }
  }, [])

  /**
   * Handle response from Auth callback
   */
  React.useEffect(() => {
    handleAuthResponse()
  }, [handleAuthResponse])

  /**
   * Listen for changes in auth service
   */
  React.useEffect(() => {
    const handleTokenChange: TListener = (_, tokens) => {
      if (tokens) {
        if (tokens.accessToken && !tokens.shouldRefresh()) {
          setLoggedIn(true)
          return
        }
      }
      setLoggedIn(false)
    }

    const remove = authService.addEventListener(handleTokenChange)

    initAuth()

    return () => {
      remove()
    }
  }, [initAuth])

  return { loggedIn, request, result, promptAsync }
}

export default useAzureAuth
