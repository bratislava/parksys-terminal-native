import { Button, Status } from '@components/ui'
import { useAuthContext } from '@lib/context/authContext'
import { ICreateTicketRes } from '@models/pricing/createTicket/createTicket.dto'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { printReceipt } from '@services/external/papaya.api'
import { createTicket } from '@services/external/pricing.api'
import { generateReceiptForTransaction } from '@utils/terminal/cashReceipt'
import React from 'react'
import { useMutation } from 'react-query'
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

const t = i18n.t

type TRouteProps = RouteProp<RootStackParamList, 'PayByCash'>

const PayByCash: React.FunctionComponent = () => {
  const { params } = useRoute<TRouteProps>()
  const { profile } = useAuthContext()
  const { replace } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [paidTicket, setPaidTicket] = React.useState<
    ICreateTicketRes | undefined
  >()

  const { finalPrice } = params

  const onPrintPress = React.useCallback(async () => {
    if (!paidTicket) {
      return
    }

    await printReceipt({
      printData: generateReceiptForTransaction(paidTicket),
      printer: {},
    })
  }, [paidTicket])

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
    setPaidTicket(finalTicket)
  }, [finalPrice.id, finalPrice.payment_id, profile])

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
      replace('Home')
    }
  }, [finalPrice.id, finalPrice.payment_id, profile, replace])

  const {
    mutate: pay,
    isLoading: payLoading,
    error,
  } = useMutation(['pay-ticket-cash'], beginTransaction)

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
                onPress={() => replace('EnterParkingInfo')}
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
                onPress={() => onPrintPress()}
                variant="secondary"
              />
              <Button
                title={t('screens.payByCash.successStatus.clientPrint')}
                onPress={() => onPrintPress()}
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
  }, [error, finalPrice.price, onPrintPress, paidTicket, payLoading, replace])

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
          <TouchableOpacity onPress={() => replace('Home')}>
            <HomeSC source={require('@images/home.png')} />
          </TouchableOpacity>
          <Button
            title={t('screens.payByCash.successStatus.backAction')}
            onPress={() => replace('EnterParkingInfo')}
            variant="primary-submit"
            style={{ flex: 1, marginLeft: 32 }}
          />
        </ButtonWrapper>
      ) : null}
    </PayByCashSC>
  )
}

export default React.memo(PayByCash)
