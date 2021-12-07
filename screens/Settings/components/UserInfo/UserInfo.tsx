/* eslint-disable react-native/no-raw-text */
import { Descriptions } from '@components/ui'
import { useAuthContext } from '@lib/context/authContext'
import * as React from 'react'
import { SectionTitle, UserInfoSC } from './UserInfo.styled'
import i18n from 'i18n-js'

const t = i18n.t

const UserInfo: React.FunctionComponent = () => {
  const { profile } = useAuthContext()

  if (!profile) {
    return null
  }

  return (
    <UserInfoSC>
      <SectionTitle>{t('components.userInfo.title')}</SectionTitle>
      <Descriptions>
        <Descriptions.Item label="ID">
          <Descriptions.Text selectable>{profile.id}</Descriptions.Text>
        </Descriptions.Item>
        <Descriptions.Item label={t('components.userInfo.displayName')}>
          <Descriptions.Text selectable>
            {profile.displayName}
          </Descriptions.Text>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <Descriptions.Text selectable>{profile.mail}</Descriptions.Text>
        </Descriptions.Item>
      </Descriptions>
    </UserInfoSC>
  )
}

export default UserInfo
