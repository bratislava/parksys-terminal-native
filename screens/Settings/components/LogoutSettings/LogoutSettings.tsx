import React from 'react'
import { LogoutSettingsSC } from './LogoutSettings.styled'
import i18n from 'i18n-js'
import { useAuthContext } from '@lib/context/authContext'
import { Button } from '@components/ui'

const LogoutSettings: React.FunctionComponent = () => {
  const { logout } = useAuthContext()

  return (
    <LogoutSettingsSC>
      <Button
        title={i18n.t('components.logoutSettings.logoutAction')}
        onPress={logout}
      />
    </LogoutSettingsSC>
  )
}

export default React.memo(LogoutSettings)
