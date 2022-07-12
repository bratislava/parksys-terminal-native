/* eslint-disable react-native/no-raw-text */
import { Button, Descriptions, Status } from '@components/ui'
import React, { useState, FunctionComponent, useCallback, memo } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import {
  ButtonWrapper,
  ParkingOrderSummarySC,
  ParkingSummarySC,
  StatusWrapper,
  CardButton,
  CashButton,
  IconSC,
  TextPriceSC,
  TextSC,
} from './ParkingOrderSummary.styled'
import i18n from 'i18n-js'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'types'
import { useMutation, useQuery } from 'react-query'
import {
  getPriceForParking,
  ticketPayment,
} from '@services/external/pricing.api'
import { presentPrice } from '@utils/utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { calculateTimeDifference, formatNativeDate } from '@utils/ui/dateUtils'
import { useAuthContext } from '@lib/context/authContext'
import { AxiosResponse } from 'axios'
import { ITicketPayment } from '@models/pricing/ticketPayment/ticketPayment.dto'
import { showErrorAlert, showPriceChangeAlert } from './utils'
import { ETicketState } from '@models/pricing/pricing.d'
import { useTheme } from 'styled-components'

enum PaymentType {
  cash = 'CASH',
  card = 'CARD',
}

const t = i18n.t

/**
 * Screen to show user summary about parking ticket before purchase
 */
const ParkingOrderSummary: FunctionComponent = () => {
  const {
    params: { ecv, parkingEnd, udr },
  } = useRoute<RouteProp<RootStackParamList, 'ParkingOrderSummary'>>()
  const { canGoBack, goBack, push } =
    useNavigation<StackNavigationProp<RootStackParamList>>()
  const { profile } = useAuthContext()
  const theme = useTheme()

  const [loading, setLoading] = useState(false)

  /**
   * Fetch price based on info from prev. step
   */
  const fetchPrice = useCallback(() => {
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
  const afterErrorHandler = useCallback(() => {
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
  const beginTransaction = useCallback(
    async (paymentType: PaymentType) => {
      if (!profile?.id) {
        throw new Error('No user logged')
      } else if (!pricingInfo?.id) {
        throw new Error('No price check executed')
      }

      /** check price last time */
      let finalPriceTmp: ITicketPayment
      try {
        finalPriceTmp = await ticketPayment(pricingInfo.id, {
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
          refetchPrice()
          showPriceChangeAlert(afterErrorHandler)
        } else {
          showErrorAlert(afterErrorHandler)
        }
        throw error
      }

      if (!finalPriceTmp) {
        throw new Error('No price calculation')
      }
      if (paymentType === PaymentType.cash) {
        push('PayByCash', {
          ecv,
          finalPrice: {
            ...finalPriceTmp,
            price: finalPriceTmp.meta.priceCash,
          },
          parkingEnd,
          udr,
        })
      } else {
        push('PayByCard', {
          ecv,
          finalPrice: {
            ...finalPriceTmp,
            price: finalPriceTmp.meta.priceCard,
          },
          parkingEnd,
          udr,
        })
      }
    },
    [
      afterErrorHandler,
      ecv,
      parkingEnd,
      pricingInfo,
      profile,
      push,
      refetchPrice,
      udr,
    ]
  )

  const { mutate: payCash, isLoading: payLoadingCash } = useMutation(
    ['pay-ticket-cash'],
    () => beginTransaction(PaymentType.cash)
  )

  const { mutate: payCard, isLoading: payLoadingCard } = useMutation(
    ['pay-ticket-card'],
    () => beginTransaction(PaymentType.card)
  )

  if (payLoadingCash || payLoadingCard) {
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
  const parkingStartDate = new Date()
  const parkingEndDate = new Date(parkingEnd)
  const { hours, minutes } = calculateTimeDifference(
    parkingStartDate,
    parkingEndDate
  )

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
              {formatNativeDate(parkingEndDate, 'dd.MM.yyyy HH:mm')}
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
                  hours: hours,
                  minutes: minutes,
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
        <CashButton onPress={() => payCash()}>
          <>
            <TextSC>{t('screens.parkingOrderSummary.cash')}</TextSC>
            <IconSC
              source={require('@images/paymentMethod/volunteer_activism.png')}
              resizeMode="contain"
            />
            <TextPriceSC>
              {presentPrice(pricingInfo.meta.priceCash)}
            </TextPriceSC>
          </>
        </CashButton>
        <CardButton onPress={() => payCard()}>
          <>
            <TextSC>{t('screens.parkingOrderSummary.card')}</TextSC>
            <IconSC
              source={require('@images/paymentMethod/Vector.png')}
              resizeMode="contain"
            />
            <TextPriceSC>
              {presentPrice(pricingInfo.meta.priceCard)}
            </TextPriceSC>
          </>
        </CardButton>
      </ButtonWrapper>
    </ParkingOrderSummarySC>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
})

export default memo(ParkingOrderSummary)
