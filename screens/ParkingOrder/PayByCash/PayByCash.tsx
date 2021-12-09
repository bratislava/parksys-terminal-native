import { Button, Status } from '@components/ui'
import { useAuthContext } from '@lib/context/authContext'
import { ICreateTicketRes } from '@models/pricing/createTicket/createTicket.dto'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { printReceipt } from '@services/external/papaya.api'
import { createTicket } from '@services/external/pricing.api'
import generateReceipt from '@utils/terminal/cashReceipt'
import React from 'react'
import { useMutation } from 'react-query'
import { TOneStackParamList } from 'types'
import { ButtonWrapper, PayByCashSC } from './PayByCash.styled'
import i18n from 'i18n-js'
import { StackNavigationProp } from '@react-navigation/stack'

const t = i18n.t

type TRouteProps = RouteProp<TOneStackParamList, 'PayByCash'>

const PayByCash: React.FunctionComponent = () => {
  const { params } = useRoute<TRouteProps>()
  const { profile } = useAuthContext()
  const { replace } = useNavigation<StackNavigationProp<TOneStackParamList>>()

  const [paidTicket, setPaidTicket] = React.useState<
    ICreateTicketRes | undefined
  >()

  const { finalPrice, udr } = params

  const onPrintPress = React.useCallback(
    async (type: 'customerReceipt' | 'merchantReceipt') => {
      if (!paidTicket) {
        return
      }

      await printReceipt({
        printData: generateReceipt({
          date: new Date(),
          items: [
            { name: `Parkovanie v ${udr.udrid}`, price: paidTicket.price },
          ],
          type,
        }),
        printer: {},
      })
    },
    [paidTicket, udr]
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
    } catch (error) {
      console.log('ERR')
    } finally {
      replace('EnterParkingInfo')
    }
  }, [finalPrice, profile, replace])

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
                onPress={() => onPrintPress('merchantReceipt')}
                variant="secondary"
              />
              <Button
                title={t('screens.payByCash.successStatus.clientPrint')}
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
        title={t('screens.payByCash.status.title')}
        description={t('screens.payByCash.status.description')}
        style={{ flex: 1 }}
        loading={payLoading}
      />
    )
  }, [error, onPrintPress, paidTicket, payLoading, replace])

  return (
    <PayByCashSC>
      {currentStatus}
      {!error && !paidTicket ? (
        <ButtonWrapper>
          <Button.Group vertical style={{ width: '100%' }}>
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
          <Button
            title={t('screens.payByCash.successStatus.backAction')}
            onPress={() => replace('EnterParkingInfo')}
          />
        </ButtonWrapper>
      ) : null}
    </PayByCashSC>
  )
}

export default React.memo(PayByCash)
