import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { TOneStackParamList } from 'types'
import { PayByCardSC } from './PayByCard.styled'
import i18n from 'i18n-js'
import { useAuthContext } from '@lib/context/authContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { createTicket } from '@services/external/pricing.api'
import { payByCard, printReceipt } from '@services/external/papaya.api'
import { EPaymentResult, ICardPaymentRes } from '@models/papaya/card/card.dto'
import { useMutation } from 'react-query'
import { Button, Status } from '@components/ui'

const t = i18n.t

type TRouteProps = RouteProp<TOneStackParamList, 'PayByCard'>

const PayByCard: React.FunctionComponent = () => {
  const { params } = useRoute<TRouteProps>()
  const { profile } = useAuthContext()
  const { replace } = useNavigation<StackNavigationProp<TOneStackParamList>>()
  const { finalPrice } = params

  const [paidTicket, setPaidTicket] = React.useState<
    ICardPaymentRes | undefined
  >()

  const onPrintPress = React.useCallback(
    async (type: 'customerReceipt' | 'merchantReceipt') => {
      if (!paidTicket) {
        return
      }
      if (type === 'customerReceipt') {
        await printReceipt({
          printData: paidTicket.content.customerReceipt,
          printer: {},
        })
      } else {
        await printReceipt({
          printData: paidTicket.content.merchantReceipt,
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

    const cardRes = await payByCard({
      externalId: finalPrice.payment_id,
      requestContents: {
        operation: 'CP',
        amount: finalPrice.price.toFixed(2),
        transactionId: finalPrice.payment_id,
      },
      printCustomerReceipt: false,
      printMerchantReceipt: false,
    })

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

    setPaidTicket(cardRes)
  }, [finalPrice, profile])

  const {
    mutate: pay,
    isLoading: payLoading,
    error,
  } = useMutation(['pay-ticket-card'], beginTransaction)

  const currentStatus = React.useMemo(() => {
    if (error) {
      return (
        <Status
          title={t('screens.payByCard.errorStatus.title')}
          description={t('screens.payByCard.errorStatus.description')}
          style={{ flex: 1 }}
          variant="error"
          extra={
            <>
              <Button
                title={t('screens.payByCard.errorStatus.action')}
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
  }, [error, onPrintPress, paidTicket, payLoading, replace])

  React.useEffect(() => {
    pay()
  }, [pay])

  return <PayByCardSC>{currentStatus}</PayByCardSC>
}

export default React.memo(PayByCard)
