import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { RootStackParamList } from 'types'
import { ButtonWrapper, HomeSC, PayByCardSC } from './PayByCard.styled'
import i18n from 'i18n-js'
import { useAuthContext } from '@lib/context/authContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { createTicket } from '@services/external/pricing.api'
import { payByCard, printReceipt } from '@services/external/papaya.api'
import { EPaymentResult, ICardPaymentRes } from '@models/papaya/card/card.dto'
import { useMutation } from '@tanstack/react-query'
import { Button, Status } from '@components/ui'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import { generateReceiptForTransaction } from '@utils/terminal/cashReceipt'
import {
  captureException,
  captureMessage,
} from '@services/internal/sentry.service'
import _ from 'lodash'
import { StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types'

const t = i18n.t

type TRouteProps = RouteProp<RootStackParamList, 'PayByCard'>

const PayByCard: React.FunctionComponent = () => {
  const { params } = useRoute<TRouteProps>()
  const { profile } = useAuthContext()
  const [showRetry, setShowRetry] = useState(false)

  const { navigate, setOptions } =
    useNavigation<StackNavigationProp<RootStackParamList>>()
  const { finalPrice } = params

  const [paidTicket, setPaidTicket] = React.useState<
    ICardPaymentRes | undefined
  >()

  const onPrintPress = React.useCallback(
    async (type: 'customerReceipt' | 'merchantReceipt') => {
      if (!paidTicket) {
        captureMessage('Missing paidTicket onPrintPress')
        return
      }
      if (type === 'customerReceipt') {
        // print both our custom and the terminal receipt for customer
        await printReceipt({
          printData: paidTicket.content.customerReceipt,
          printer: {},
        })
        await printReceipt({
          printData: generateReceiptForTransaction(finalPrice),
          printer: {},
        })
      } else {
        await printReceipt({
          printData: paidTicket.content.merchantReceipt,
          printer: {},
        })
      }
    },
    [finalPrice, paidTicket]
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

    const id = _.random(100, 999)

    const cardRes = await payByCard({
      externalId: `${finalPrice.payment_id}${id}`, // what it takes as suffix: '-', '1', '999', what it doesn't take as suffix: '1133', '-1',
      requestContents: {
        operation: 'CP',
        amount: (finalPrice.price / 100).toFixed(2),
        transactionId: `${finalPrice.payment_id}${id}`,
      },
      printCustomerReceipt: false,
      printMerchantReceipt: false,
    })

    setShowRetry(
      cardRes.content.result === EPaymentResult.CANCELED_BY_USER &&
        cardRes.content.respMessage === 'Zrušené užívateľom'
    )

    if (cardRes.content.result === EPaymentResult.CANCELED) {
      throw new Error('PAYMENT_CANCELED')
    } else if (cardRes.content.result !== EPaymentResult.SUCCESS) {
      throw new Error('PAYMENT_ERROR')
    }

    await createTicket(finalPrice.id, {
      payment_id: finalPrice.payment_id,
      terminalId: profile.id,
      transactionState: 200,
      payment_type: 'card',
    })

    // automatically print our custom customerReceipt on successful payment
    // don't await - if printing fails, we can reprint manually
    printReceipt({
      printData: cardRes.content.customerReceipt,
      printer: {},
    }).catch(captureException)

    setPaidTicket(cardRes)
    setOptions({
      headerLeft: () => null,
    } as Partial<StackNavigationEventMap>)
  }, [finalPrice, profile, setOptions])

  const {
    mutate: pay,
    isPending: payLoading,
    error,
  } = useMutation({
    mutationKey: ['pay-ticket-card'],
    mutationFn: beginTransaction,
  })

  const currentStatus = React.useMemo(() => {
    if (error) {
      return (
        <Status
          title={t('screens.payByCard.errorStatus.title')}
          description={t('screens.payByCard.errorStatus.description')}
          style={{ flex: 1 }}
          variant="error"
          icon="money"
          extra={
            <>
              {showRetry && (
                <Button
                  title={t('screens.payByCard.errorStatus.tryAgain')}
                  onPress={() => pay()}
                />
              )}
              <Button
                title={t('screens.payByCard.errorStatus.action')}
                onPress={() => navigate('Home')}
              />
            </>
          }
        />
      )
    }

    if (paidTicket) {
      return (
        <Status
          title={t('screens.payByCard.successStatus.title')}
          description={t('screens.payByCard.successStatus.description')}
          style={{ flex: 1 }}
          variant="success"
          extra={
            <Button.Group style={{ marginHorizontal: 32 }}>
              <Button
                title={t('screens.payByCard.successStatus.merchantPrint')}
                onPress={() => onPrintPress('merchantReceipt')}
                variant="secondary"
              />
              <Button
                title={t('screens.payByCard.successStatus.clientPrint')}
                onPress={() => onPrintPress('customerReceipt')}
                variant="secondary"
              />
            </Button.Group>
          }
        />
      )
    }

    return (
      <Status
        title={t('screens.payByCard.status.title')}
        description={t('screens.payByCard.status.description')}
        style={{ flex: 1 }}
        loading={payLoading}
      />
    )
  }, [error, onPrintPress, paidTicket, payLoading, navigate, pay])

  React.useEffect(() => {
    pay()
  }, [pay])

  return (
    <PayByCardSC>
      <StatusBar style="dark" />
      {currentStatus}
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
    </PayByCardSC>
  )
}

export default React.memo(PayByCard)
