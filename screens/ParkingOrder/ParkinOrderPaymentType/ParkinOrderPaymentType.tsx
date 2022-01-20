import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from 'types'
import {
  ParkinOrderPaymentTypeSC,
  TextSC,
  IconSC,
  CashButton,
  CardButton,
} from './ParkinOrderPaymentType.styled'
import i18n from 'i18n-js'
import ConfirmationModal from '@components/ConfirmationModal'
import { Button } from '@components/ui'

const t = i18n.t

type TRoute = RouteProp<RootStackParamList, 'ParkinOrderPaymentType'>

const ParkinOrderPaymentType: React.FunctionComponent = () => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { params } = useRoute<TRoute>()
  const { navigate, setOptions } =
    useNavigation<StackNavigationProp<RootStackParamList>>()
  const { ecv, finalPrice, parkingEnd, udr } = params

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <Button
          onPress={() => setShowConfirmationDialog(true)}
          title={i18n.t('screens.parkinOrderPaymentType.close')}
        />
      ),
    })
  })

  return (
    <ParkinOrderPaymentTypeSC edges={['bottom']}>
      <ConfirmationModal
        title={t('screens.parkinOrderPaymentType.confirmationDialogTitle')}
        confirmText={t('screens.parkinOrderPaymentType.confirm')}
        dismissText={t('screens.parkinOrderPaymentType.cancel')}
        visible={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        onConfirm={() => {
          setShowConfirmationDialog(false)
          navigate('Home')
        }}
      />
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
