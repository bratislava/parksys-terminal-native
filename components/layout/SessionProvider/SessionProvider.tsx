import { Status } from '@components/ui'
import useSession from '@hooks/useSession'
import { SessionContextProvider } from '@lib/context/sessionContext'
import React from 'react'
import { SessionProviderSC } from './SessionProvider.styled'
import i18n from 'i18n-js'

const t = i18n.t

/**
 * Wrapper around session
 */

export type SessionProviderProps = {
  children: React.ReactNode
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const value = useSession()

  return (
    <SessionContextProvider value={value}>
      {(value.sessionLoading && !value.session) ||
      !value.session ||
      value.sessionError ? (
        <SessionProviderSC>
          <Status
            loading={value.sessionLoading}
            title={t('components.sessionProvider.title')}
            description={t(
              `components.sessionProvider.${
                value.sessionError ? 'descriptionError' : 'description'
              }`
            )}
            variant={value.sessionError ? 'error' : 'info'}
          />
        </SessionProviderSC>
      ) : (
        children
      )}
    </SessionContextProvider>
  )
}

export default SessionProvider
