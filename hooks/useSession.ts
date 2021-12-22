import React from 'react'
import { useQuery } from 'react-query'
import { useAuthContext } from '@lib/context/authContext'
import { getEmployeeSession } from '@services/external/pricing.api'

function useSession() {
  const { profile, logout } = useAuthContext()

  const { data, refetch, isLoading, error } = useQuery(
    ['getSession', profile],
    async () => {
      if (!profile?.id) {
        return null
      }

      try {
        const sessionData = await getEmployeeSession(profile.id)
        if (sessionData.closed) {
          logout()
          return null
        }

        return sessionData
      } catch (error) {
        console.log('Get session err', error)
        logout()
      }
    },
    { initialData: undefined }
  )

  const getSession = React.useCallback(async () => {
    const data = await refetch()

    return data.data
  }, [refetch])

  return React.useMemo(
    () => ({
      session: data ?? undefined,
      getSession,
      sessionLoading: isLoading,
      sessionError: error,
    }),
    [data, error, getSession, isLoading]
  )
}

export default useSession
