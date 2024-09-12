import { Button, Status } from '@components/ui'
import { useAuthContext } from '@lib/context/authContext'
import { ICreateTicketRes } from '@models/pricing/createTicket/createTicket.dto'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { printReceipt } from '@services/external/papaya.api'
import { createTicket } from '@services/external/pricing.api'
import { generateReceiptForTransaction } from '@utils/terminal/cashReceipt'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { RootStackParamList } from 'types'
import {
  ButtonWrapper,
  PayByCashSC,
  AmountText,
  HomeSC,
} from './PayByCash.styled'
import i18n from 'i18n-js'
import { StackNavigationProp } from '@react-navigation/stack'
import { presentPrice } from '@utils/utils'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { captureMessage } from '@services/internal/sentry.service'

const t = i18n.t

type TRouteProps = RouteProp<RootStackParamList, 'PayByCash'>

const PayByCash: React.FunctionComponent = () => {
  const { params } = useRoute<TRouteProps>()
  const { profile } = useAuthContext()
  const { navigate, setOptions } =
    useNavigation<StackNavigationProp<RootStackParamList>>()

  const [paidTicket, setPaidTicket] = React.useState<
    ICreateTicketRes | undefined
  >()

  const { finalPrice } = params

  const onPrintPress = React.useCallback(
    async (type: 'customerReceipt' | 'merchantReceipt') => {
      if (!paidTicket) {
        captureMessage('Missing paidTicket onPrintPress')
        return
      }

      if (type === 'customerReceipt') {
        await printReceipt({
          printData: generateReceiptForTransaction(paidTicket),
          printer: {},
        })
      } else {
        await printReceipt({
          printData: generateReceiptForTransaction(paidTicket, true),
          printer: {},
        })
      }
    },
    [paidTicket]
  )

  /**
   * Begin payment for selected type
   */
  const beginTransaction = React.useCallback(async () => {
    if (!profile?.id) {
      throw new Error('No user logged')
    } else if (!finalPrice?.id) {
      throw new Error('No price check executed')
    }

    const finalTicket = await createTicket(finalPrice.id, {
      payment_id: finalPrice.payment_id,
      terminalId: profile.id,
      transactionState: 200,
      payment_type: 'cash',
    })
    setOptions({ headerLeft: () => null })
    setPaidTicket(finalTicket)
  }, [finalPrice, profile, setOptions])

  const cancelTransaction = React.useCallback(async () => {
    if (!profile?.id) {
      throw new Error('No user logged')
    } else if (!finalPrice?.id) {
      throw new Error('No price check executed')
    }

    try {
      await createTicket(finalPrice.id, {
        payment_id: finalPrice.payment_id,
        terminalId: profile.id,
        transactionState: 400,
        payment_type: 'cash',
      })
    } finally {
      navigate('Home')
    }
  }, [finalPrice, profile, navigate])

  const {
    mutate: pay,
    isPending: payLoading,
    error,
  } = useMutation({
    mutationKey: ['pay-ticket-cash'],
    mutationFn: beginTransaction,
  })

  const currentStatus = React.useMemo(() => {
    if (error) {
      return (
        <Status
          title={t('screens.payByCash.errorStatus.title')}
          description={t('screens.payByCash.errorStatus.description')}
          style={{ flex: 1 }}
          variant="error"
          extra={
            <>
              <Button
                title={t('screens.payByCash.errorStatus.action')}
                onPress={() => navigate('EnterParkingInfo')}
              />
            </>
          }
        />
      )
    }

    if (paidTicket) {
      return (
        <Status
          title={t('screens.payByCash.successStatus.title')}
          description={t('screens.payByCash.successStatus.description')}
          style={{ flex: 1 }}
          variant="success"
          extra={
            <Button.Group style={{ marginHorizontal: 32 }}>
              <Button
                title={t('screens.payByCash.successStatus.merchantPrint')}
                onPress={() => onPrintPress('merchantReceipt')}
                variant="secondary"
              />
              <Button
                title={t('screens.payByCash.successStatus.clientPrint')}
                onPress={() => onPrintPress('customerReceipt')}
                variant="primary-submit"
              />
            </Button.Group>
          }
        />
      )
    }

    return (
      <Status
        title={t('screens.payByCash.status.title')}
        description={t('screens.payByCash.status.description')}
        style={{ flex: 1 }}
        icon="euro-symbol"
        loading={payLoading}
        extra={
          <>
            <AmountText>{presentPrice(finalPrice.price)}</AmountText>
          </>
        }
      />
    )
  }, [error, finalPrice.price, onPrintPress, paidTicket, payLoading, navigate])

  return (
    <PayByCashSC>
      <StatusBar style="dark" />
      {currentStatus}
      {!error && !paidTicket ? (
        <ButtonWrapper>
          <Button.Group style={{ width: '100%' }}>
            <Button
              title={t('screens.payByCash.actions.cancelAction')}
              variant="secondary"
              onPress={() => cancelTransaction()}
            />
            <Button
              title={t('screens.payByCash.actions.confirmAction')}
              variant="primary-submit"
              onPress={() => pay()}
            />
          </Button.Group>
        </ButtonWrapper>
      ) : null}
      {paidTicket ? (
        <ButtonWrapper>
          <TouchableOpacity onPress={() => navigate('Home')}>
            <HomeSC source={require('@images/home.png')} />
          </TouchableOpacity>
          <Button
            title={t('screens.payByCash.successStatus.backAction')}
            onPress={() => navigate('EnterParkingInfo')}
            variant="primary-submit"
            style={{ flex: 1, marginLeft: 32 }}
          />
        </ButtonWrapper>
      ) : null}
    </PayByCashSC>
  )
}

export default React.memo(PayByCash)
