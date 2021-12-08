/* eslint-disable react-native/no-raw-text */
import { Button, Descriptions, Status } from '@components/ui'
import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  ButtonWrapper,
  ParkingOrderSummarySC,
  ParkingSummarySC,
  StatusWrapper,
} from './ParkingOrderSummary.styled'
import i18n from 'i18n-js'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TOneStackParamList } from 'types'
import { ZonedDateTime, ChronoUnit } from '@js-joda/core'
import { useMutation, useQuery } from 'react-query'
import {
  createTicket,
  getPriceForParking,
  ticketPayment,
} from '@services/external/pricing.api'
import { presentPrice } from '@utils/utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { formatNativeDate } from '@utils/ui/dateUtils'
import { useAuthContext } from '@lib/context/authContext'
import { AxiosResponse } from 'axios'
import { ITicketPayment } from '@models/pricing/ticketPayment/ticketPayment.dto'
import { showErrorAlert, showPriceChangeAlert, payTicket } from './utils'
import { ETicketState } from '@models/pricing/pricing.d'

const t = i18n.t

/**
 * Screen to show user summary about parking ticket before purchase
 */
const ParkingOrderSummary: React.FunctionComponent = () => {
  const {
    params: { ecv, parkingEnd, udr },
  } = useRoute<RouteProp<TOneStackParamList, 'ParkingOrderSummary'>>()
  const { canGoBack, goBack, replace } =
    useNavigation<StackNavigationProp<TOneStackParamList>>()
  const { profile } = useAuthContext()

  /**
   * Fetch price based on info from prev. step
   */
  const fetchPrice = React.useCallback(() => {
    if (!profile?.id) {
      throw new Error('No user logged')
    }

    return getPriceForParking({
      ecv,
      parkingEnd,
      udr: udr.udrid,
      // TODO: add terminal info
      partnerId: '1',
      terminalId: profile.id,
    })
  }, [ecv, parkingEnd, profile?.id, udr.udrid])

  /**
   * After error, go back to prev screen if we can
   */
  const afterErrorHandler = React.useCallback(() => {
    if (canGoBack()) {
      goBack()
    }
  }, [canGoBack, goBack])

  const {
    data: pricingInfo,
    error,
    isLoading,
    refetch: refetchPrice,
  } = useQuery(['getPriceForParking'], fetchPrice, {
    cacheTime: 0,
  })

  /**
   * Begin payment for selected type
   */
  const beginTransaction = React.useCallback(
    async (type: 'card' | 'cash') => {
      if (!profile?.id) {
        throw new Error('No user logged')
      } else if (!pricingInfo?.id) {
        throw new Error('No price check executed')
      }

      /** check price last time */
      let finalPrice: ITicketPayment
      try {
        finalPrice = await ticketPayment(pricingInfo.id, {
          ecv,
          parkingEnd,
          udr: udr.udrid,
          // TODO: add terminal info
          partnerId: '1',
          terminalId: profile.id,
        })
      } catch (error) {
        const err = error as AxiosResponse<ITicketPayment>
        const response = err.data || {}

        if (response.state === ETicketState.PRICE_WAS_CHANGED) {
          showPriceChangeAlert(afterErrorHandler, refetchPrice)
        } else {
          showErrorAlert(afterErrorHandler)
        }
        throw error
      }

      if (!finalPrice) {
        throw new Error('No price calculation')
      }

      try {
        /** pay ticket on terminal */
        await payTicket(finalPrice, type, udr.udrid)
        /** call ticket activation */
        const finalTicket = await createTicket(finalPrice.id, {
          payment_id: finalPrice.payment_id,
          terminalId: profile.id,
          transactionState: 200,
        })
        replace('PaymentStatus', {
          id: finalTicket.id,
          state: finalTicket.state,
          type: 'success',
        })
      } catch (error) {
        console.log('ERROR', error)
        const err = error as AxiosResponse<ITicketPayment>
        replace('PaymentStatus', {
          id: err.data.id,
          state: err.data.state,
          type: 'error',
        })
      }
    },
    [
      afterErrorHandler,
      ecv,
      parkingEnd,
      pricingInfo,
      profile,
      refetchPrice,
      replace,
      udr.udrid,
    ]
  )

  const { mutate: pay, isLoading: payLoading } = useMutation(
    ['pay-ticket'],
    beginTransaction
  )

  if (payLoading) {
    return (
      <StatusWrapper>
        <Status
          title={i18n.t('screens.parkingOrderSummary.paymentProgress.title')}
          description={i18n.t(
            'screens.parkingOrderSummary.paymentProgress.description'
          )}
          variant="default"
          loading
        />
      </StatusWrapper>
    )
  }

  if (error) {
    return (
      <StatusWrapper>
        <Status
          title={i18n.t('screens.parkingOrderSummary.error.title')}
          description={i18n.t('screens.parkingOrderSummary.error.description')}
          variant="error"
          extra={
            <Button
              title={i18n.t('screens.parkingOrderSummary.error.action')}
              onPress={afterErrorHandler}
            />
          }
        />
      </StatusWrapper>
    )
  }

  if (isLoading || !pricingInfo) {
    return (
      <StatusWrapper>
        <Status
          title={i18n.t('screens.parkingOrderSummary.loading.title')}
          loading
        />
      </StatusWrapper>
    )
  }

  /**
   * Calculate durations of parking for given end timestamp
   */
  const parkingEndDate = ZonedDateTime.parse(parkingEnd)
  const durationHours = ZonedDateTime.now().until(
    parkingEndDate,
    ChronoUnit.HOURS
  )
  const durationMinutes = ZonedDateTime.now()
    .plusHours(durationHours)
    .until(parkingEndDate, ChronoUnit.MINUTES)

  return (
    <ParkingOrderSummarySC>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Descriptions layout="vertical">
          <Descriptions.Item
            label={i18n.t('screens.parkingOrderSummary.parkingDescription.ecv')}
          >
            <Descriptions.Text>{ecv}</Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={i18n.t(
              'screens.parkingOrderSummary.parkingDescription.street'
            )}
          >
            <Descriptions.Text>{`${udr.nazov} (${udr.mestskaCast})`}</Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={i18n.t('screens.parkingOrderSummary.parkingDescription.udr')}
          >
            <Descriptions.Text>{`${udr.udrid} (${udr.kodZony})`}</Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={i18n.t(
              'screens.parkingOrderSummary.parkingDescription.parkingEnd'
            )}
          >
            <Descriptions.Text>
              {formatNativeDate(new Date(parkingEnd), 'd.M.yyyy HH:mm')}
            </Descriptions.Text>
          </Descriptions.Item>
        </Descriptions>
        <ParkingSummarySC layout="horizontal">
          <Descriptions.Item
            label={i18n.t(
              'screens.parkingOrderSummary.parkingSummary.duration'
            )}
          >
            <Descriptions.Text>
              {i18n.t(
                'screens.parkingOrderSummary.parkingSummary.durationString',
                {
                  hours: durationHours,
                  minutes: durationMinutes,
                }
              )}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={i18n.t('screens.parkingOrderSummary.parkingSummary.status')}
          >
            <Descriptions.Text>
              {pricingInfo.extension
                ? t(
                    'screens.parkingOrderSummary.parkingSummary.status_extension'
                  )
                : t('screens.parkingOrderSummary.parkingSummary.status_new')}
            </Descriptions.Text>
          </Descriptions.Item>
        </ParkingSummarySC>
      </ScrollView>
      <ButtonWrapper>
        <Descriptions
          layout="horizontal"
          style={{ width: '100%', marginBottom: 10 }}
        >
          <Descriptions.Item
            label={i18n.t('screens.parkingOrderSummary.parkingSummary.price')}
          >
            <Descriptions.Text style={styles.price}>
              {presentPrice(pricingInfo.price * 100)}
            </Descriptions.Text>
          </Descriptions.Item>
        </Descriptions>
        <Button.Group>
          <Button
            title={i18n.t('screens.parkingOrderSummary.actions.cashAction')}
            variant="primary-submit"
            onPress={() => pay('cash')}
          />
          <Button
            title={i18n.t('screens.parkingOrderSummary.actions.cardAction')}
            onPress={() => pay('card')}
          />
        </Button.Group>
      </ButtonWrapper>
    </ParkingOrderSummarySC>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  price: {
    textAlign: 'right',
    flex: 1,
    fontSize: 32,
  },
})

export default React.memo(ParkingOrderSummary)
