import { Button, Status } from '@components/ui'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { TOneStackParamList } from 'types'
import { PaymentStatusSC, ActionButton } from './PaymentStatus.styled'
import i18n from 'i18n-js'
import { Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

const t = i18n.t

type TRouteProps = RouteProp<TOneStackParamList, 'PaymentStatus'>

const PaymentStatus: React.FunctionComponent = () => {
  const { params } = useRoute<TRouteProps>()
  const { id, state, type } = params
  const { navigate } = useNavigation<StackNavigationProp<TOneStackParamList>>()

  return (
    <PaymentStatusSC>
      <Status
        variant={type}
        title={t(`screens.paymentStatus.${type}.title`)}
        description={t(`screens.paymentStatus.${type}.description`)}
        extra={
          type === 'success' ? (
            <Button variant="primary-submit" />
          ) : (
            <>
              <Text>{`ID: ${id}`}</Text>
              <Text>{`STATE: ${state}`}</Text>
              <ActionButton
                variant="primary"
                onPress={() => navigate('EnterParkingInfo')}
                title={t(`screens.paymentStatus.${type}.action`)}
              />
            </>
          )
        }
      />
    </PaymentStatusSC>
  )
}

export default React.memo(PaymentStatus)
