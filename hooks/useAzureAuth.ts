import * as React from 'react'
import authService from '@services/internal/auth.service'
import { IAuthSession, TListener } from 'types/authService.d'

/**
 * Hook to auth user with Azure Login
 * Use this only once in app
 * @returns auth functions
 */
function useAzureAuth() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [tokens, setTokens] = React.useState<IAuthSession | undefined>()

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
      if (session) {
        setLoggedIn(true)
        setTokens(session)
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
    () => ({ login, logout, loggedIn, tokens }),
    [login, logout, loggedIn, tokens]
  )
}

export default useAzureAuth
