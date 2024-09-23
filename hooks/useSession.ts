import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuthContext } from '@lib/context/authContext'
import {
  closeSession,
  getEmployeeSession,
} from '@services/external/pricing.api'
import {
  captureException,
  captureMessage,
} from '@services/internal/sentry.service'

function useSession() {
  const { profile, logout } = useAuthContext()

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['getSession', profile],
    queryFn: async () => {
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
        captureMessage('Get session err')
        captureException(error)
        logout()
      }
    },
    initialData: undefined,
  })

  const { mutate } = useMutation({
    mutationKey: ['close-session', data?.id],
    mutationFn: async () => {
      if (!data?.id) {
        throw new Error('NO SESSION ID')
      }
      try {
        await closeSession(data?.id)
      } catch (error) {
        captureMessage('Close session error')
        captureException(error)
      }
    },
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
