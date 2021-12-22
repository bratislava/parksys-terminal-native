import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useAuthContext } from '@lib/context/authContext'
import {
  closeSession,
  getEmployeeSession,
} from '@services/external/pricing.api'

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

  const { mutate } = useMutation(['close-session', data?.id], async () => {
    if (!data?.id) {
      throw new Error('NO SESSION ID')
    }
    try {
      await closeSession(data?.id)
    } catch (error) {
      console.log('Close session error', error)
    }
  })

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
      closeSession: mutate as () => Promise<void>,
    }),
    [data, error, getSession, isLoading, mutate]
  )
}

export default useSession
