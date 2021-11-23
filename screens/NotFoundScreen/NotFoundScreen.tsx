import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import i18n from 'i18n-js'
import { RootStackParamList } from '../../types'
import { useQuery } from 'react-query'
import {
  LinkSC,
  LinkText,
  NotFoundScreenSC,
  TitleSC,
} from './NotFoundScreen.styled'
import { getMhdStops } from '@utils/api'

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  // example fetching - when loading is successful, data is defined & correctly typed
  const { data, isLoading, error } = useQuery(['getMhdStops'], getMhdStops)
  console.log(data, isLoading, error)

  return (
    <NotFoundScreenSC>
      <TitleSC>{i18n.t('screens.notFound.title')}</TitleSC>
      <LinkSC onPress={() => navigation.replace('Root')}>
        <LinkText>{i18n.t('screens.notFound.goHome')}</LinkText>
      </LinkSC>
    </NotFoundScreenSC>
  )
}
