import * as React from 'react'
import authService from '@services/internal/auth.service'
import { IAuthSession, TListener } from 'types/authService.d'
import { IAzureProfile } from '@models/azure/user/azureUser.d'

/**
 * Hook to auth user with Azure Login
 * Use this only once in app
 * @returns auth functions
 */
function useAzureAuth() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [tokens, setTokens] = React.useState<IAuthSession | undefined>()
  const [profile, setProfile] = React.useState<IAzureProfile | undefined>()

  const login = authService.authenticate
  const logout = authService.revokeTokens

  /**
   * Load tokens from storage, and log in user if token is not expired
   */
  const initAuth = React.useCallback(async () => {
    const token = await authService.getDecoded()

    if (token) {
      setLoggedIn(true)
    }
  }, [])

  /**
   * Listen for changes in auth service
   */
  React.useEffect(() => {
    const handleTokenChange: TListener = (session, decoded) => {
      if (session && decoded) {
        setProfile({
          id: decoded.oid,
          mail: decoded.preferred_username,
          displayName: decoded.name,
        })
        setTokens(session)
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
        setTokens(undefined)
      }
    }

    const remove = authService.addEventListener(handleTokenChange)

    initAuth()

    return () => {
      remove()
    }
  }, [initAuth])

  return React.useMemo(
    () => ({ login, logout, loggedIn, tokens, profile }),
    [login, logout, loggedIn, tokens, profile]
  )
}

export default useAzureAuth
