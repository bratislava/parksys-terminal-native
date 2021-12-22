import React from 'react'
import { LogoutSettingsSC } from './LogoutSettings.styled'
import i18n from 'i18n-js'
import { Button } from '@components/ui'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'types'

const LogoutSettings: React.FunctionComponent = () => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <LogoutSettingsSC>
      <Button
        title={i18n.t('components.logoutSettings.sessionAction')}
        onPress={() => push('SessionClose')}
      />
    </LogoutSettingsSC>
  )
}

export default React.memo(LogoutSettings)
