import React from 'react'
import { HomeSC, TileIcon, TileSC, TileText } from './Home.styled'
import { StatusBar } from 'expo-status-bar'
import i18n from 'i18n-js'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'types'

const t = i18n.t

const Home: React.FunctionComponent = () => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>()
  return (
    <>
      <StatusBar style="light" />
      <HomeSC>
        <TileSC onPress={() => push('EnterParkingInfo')}>
          <TileIcon source={require('@images/home/credit_card.png')} />
          <TileText>{t('screens.home.payment')}</TileText>
        </TileSC>
        <TileSC onPress={() => push('TransactionsHistory')}>
          <TileIcon source={require('@images/home/restore.png')} />
          <TileText>{t('screens.home.history')}</TileText>
        </TileSC>
        <TileSC onPress={() => push('Settings')}>
          <TileIcon source={require('@images/home/Vector.png')} />
          <TileText>{t('screens.home.settings')}</TileText>
        </TileSC>
        <TileSC onPress={() => push('SessionClose')}>
          <TileIcon source={require('@images/home/receipt_long.png')} />
          <TileText>{t('screens.home.closeSession')}</TileText>
        </TileSC>
      </HomeSC>
    </>
  )
}

export default React.memo(Home)
