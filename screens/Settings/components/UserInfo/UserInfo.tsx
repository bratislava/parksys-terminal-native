import { Button, Descriptions } from '@components/ui'
import { useAuthContext } from '@lib/context/authContext'
import * as React from 'react'
import { UserInfoSC } from './UserInfo.styled'
import i18n from 'i18n-js'

const UserInfo: React.FunctionComponent = () => {
  const { profile, logout } = useAuthContext()

  if (!profile) {
    return null
  }

  return (
    <UserInfoSC>
      <Descriptions>
        <Descriptions.Item label="ID">
          <Descriptions.Text selectable>{profile.id}</Descriptions.Text>
        </Descriptions.Item>
        <Descriptions.Item label={i18n.t('components.userInfo.displayName')}>
          <Descriptions.Text selectable>
            {profile.displayName}
          </Descriptions.Text>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <Descriptions.Text selectable>{profile.mail}</Descriptions.Text>
        </Descriptions.Item>
      </Descriptions>
      <Button
        title={i18n.t('components.userInfo.logoutAction')}
        onPress={logout}
        style={{ marginTop: 32 }}
      />
    </UserInfoSC>
  )
}

export default UserInfo
