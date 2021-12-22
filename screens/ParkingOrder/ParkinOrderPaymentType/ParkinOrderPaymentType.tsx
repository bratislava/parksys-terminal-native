import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { RootStackParamList } from 'types'
import {
  ParkinOrderPaymentTypeSC,
  TextSC,
  IconSC,
  CashButton,
  CardButton,
} from './ParkinOrderPaymentType.styled'
import i18n from 'i18n-js'

const t = i18n.t

type TRoute = RouteProp<RootStackParamList, 'ParkinOrderPaymentType'>

const ParkinOrderPaymentType: React.FunctionComponent = () => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { params } = useRoute<TRoute>()
  const { ecv, finalPrice, parkingEnd, udr } = params

  return (
    <ParkinOrderPaymentTypeSC edges={['bottom']}>
      <CashButton
        onPress={() =>
          push('PayByCash', {
            ecv,
            finalPrice,
            parkingEnd,
            udr,
          })
        }
      >
        <IconSC
          source={require('@images/paymentMethod/volunteer_activism.png')}
          resizeMode="contain"
        />
        <TextSC>{t('screens.parkinOrderPaymentType.cash')}</TextSC>
      </CashButton>
      <CardButton
        onPress={() =>
          push('PayByCard', {
            ecv,
            finalPrice,
            parkingEnd,
            udr,
          })
        }
      >
        <IconSC
          source={require('@images/paymentMethod/Vector.png')}
          resizeMode="contain"
        />
        <TextSC>{t('screens.parkinOrderPaymentType.card')}</TextSC>
      </CardButton>
    </ParkinOrderPaymentTypeSC>
  )
}

export default React.memo(ParkinOrderPaymentType)
