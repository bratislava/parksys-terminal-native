/* eslint-disable react-native/no-raw-text */
import { Button, Descriptions } from '@components/ui'
import React from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'
import {
  ButtonWrapper,
  SectionTitle,
  SessionCloseSC,
} from './SessionClose.styled'
import i18n from 'i18n-js'
import { useAuthContext } from '@lib/context/authContext'
import { useSessionContext } from '@lib/context/sessionContext'
import { presentPrice } from '@utils/utils'
import { formatNativeDate } from '@utils/ui/dateUtils'
import { useFocusEffect } from '@react-navigation/native'

const t = i18n.t

const SessionClose: React.FunctionComponent = () => {
  const { profile } = useAuthContext()
  const { session, getSession } = useSessionContext()

  const refetch = React.useCallback(() => {
    getSession()
  }, [getSession])

  useFocusEffect(refetch)

  if (!session || !profile) {
    return null
  }

  return (
    <SessionCloseSC>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <SectionTitle>{t('screens.sessionClose.subTitle')}</SectionTitle>
        <Descriptions>
          <Descriptions.Item label={t('screens.sessionClose.id')}>
            <Descriptions.Text selectable>{session.id}</Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item label={t('screens.sessionClose.person')}>
            <Descriptions.Text>{profile.displayName}</Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.sessionClose.cash')}
            prefix={
              <Image
                source={require('@images/volunteer_activism.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            }
          >
            <Descriptions.Text>
              {presentPrice(session.price_cash ?? 0)}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.sessionClose.card')}
            prefix={
              <Image
                source={require('@images/card.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            }
          >
            <Descriptions.Text>
              {presentPrice(session.price_card ?? 0)}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item label={t('screens.sessionClose.count')}>
            <Descriptions.Text>{`${
              session?.transactions ?? 0
            }x`}</Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item label={t('screens.sessionClose.createdAt')}>
            <Descriptions.Text>
              {formatNativeDate(new Date(session.created_at), 'd.M.yyyy HH:mm')}
            </Descriptions.Text>
          </Descriptions.Item>
        </Descriptions>
      </ScrollView>
      <ButtonWrapper>
        <Button title={t('screens.sessionClose.logout')} />
      </ButtonWrapper>
    </SessionCloseSC>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 24, paddingHorizontal: 16 },
  icon: {
    width: 36,
    height: 36,
    margin: 4,
  },
})

export default React.memo(SessionClose)
