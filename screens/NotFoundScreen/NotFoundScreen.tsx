import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import i18n from 'i18n-js'
import { RootStackParamList } from '../../types'
import {
  LinkSC,
  LinkText,
  NotFoundScreenSC,
  TitleSC,
} from './NotFoundScreen.styled'

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  return (
    <NotFoundScreenSC>
      <TitleSC>{i18n.t('screens.notFound.title')}</TitleSC>
      <LinkSC onPress={() => navigation.replace('Root')}>
        <LinkText>{i18n.t('screens.notFound.goHome')}</LinkText>
      </LinkSC>
    </NotFoundScreenSC>
  )
}
