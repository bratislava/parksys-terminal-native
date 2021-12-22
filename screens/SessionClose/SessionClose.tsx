/* eslint-disable react-native/no-raw-text */
import { Button, Descriptions } from '@components/ui'
import React from 'react'
import { Alert, Image, ScrollView, StyleSheet } from 'react-native'
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
import secureStorageService from '@services/internal/secureStorage.service'
import { printReceipt } from '@services/external/papaya.api'
import generateReceipt from '@utils/terminal/cashReceipt'

const t = i18n.t

const SessionClose: React.FunctionComponent = () => {
  const { profile, logout } = useAuthContext()
  const { session, getSession, closeSession } = useSessionContext()

  const refetch = React.useCallback(() => {
    getSession()
  }, [getSession])

  useFocusEffect(refetch)

  const printSessionReceipt = React.useCallback(async () => {
    if (!session) {
      throw new Error('NO SESSION TO PRINT')
    }
    await printReceipt({
      printer: {},
      printData: generateReceipt({
        title: 'Mesto Bratislava',
        itemsTitle: ' ',
        items: [
          {
            name: 'Hotovosť',
            price: session?.price_cash ?? 0,
          },
          {
            name: 'Karta',
            price: session?.price_card ?? 0,
          },
        ],
        type: 'sessionClose',
        transactionStatus: 'RELÁCIA UKONČENÁ',
        footer: [
          `${session?.id}`,
          formatNativeDate(new Date(session?.created_at), 'dd.MM.yyyy HH:mm'),
          'Ďakujeme Vám.',
          'Uzávierku si uchovajte',
          'a odovzdajde s terminálom.',
        ],
      }),
    })
  }, [session])

  const handleClose = React.useCallback(async () => {
    try {
      await closeSession()
      await printSessionReceipt()
      await logout()
    } catch (error) {
      console.log(error)
    } finally {
      await secureStorageService.clearStorage()
    }
  }, [closeSession, logout, printSessionReceipt])

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
        <Button
          title={t('screens.sessionClose.logout')}
          onPress={() => {
            Alert.alert(
              'Naozaj sa chcete odhlásiť?',
              'Týmto ukončíte aktuálnu reláciu a bude Vám vytlačená potvrdenka.',
              [
                {
                  text: 'Áno',
                  style: 'destructive',
                  onPress: () => handleClose(),
                },
                {
                  text: 'Zrušiť',
                  style: 'cancel',
                },
              ]
            )
          }}
        />
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
