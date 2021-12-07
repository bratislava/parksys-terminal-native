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
import {
  DateTimeFormatter,
  ZonedDateTime,
  ChronoUnit,
  Instant,
  LocalDateTime,
  nativeJs,
} from '@js-joda/core'
import { useQuery } from 'react-query'
import { getPriceForParking } from '@services/external/pricing.api'
import { presentPrice } from '@utils/utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { payByCash, payByCard } from '@services/external/papaya.api'
import { formatNativeDate } from '@utils/ui/dateUtils'

/**
 * Screen to show user summary about parking ticket before purchase
 */
const ParkingOrderSummary: React.FunctionComponent = () => {
  const {
    params: { ecv, parkingEnd, udr },
  } = useRoute<RouteProp<TOneStackParamList, 'ParkingOrderSummary'>>()
  const { canGoBack, goBack } =
    useNavigation<StackNavigationProp<TOneStackParamList>>()

  const payByCashHandler = React.useCallback(() => {
    payByCash({
      externalId: 'uuid:bb78531a-f2f7-c27f-9523-819b1d280a4b',
      amount: 300,
      footer: 'Morning deposit',
      exception: false,
    })
  }, [])

  const payByCardHandler = React.useCallback(() => {
    payByCard({
      externalId: 'a94ffc06-a5ba-4ac6-a6a9-53da9ab8b6ff',
      requestContents: {
        operation: 'CP',
        amount: '1',
        transactionId: '558bb7e5-205d-4168-bbf0-db2908cbfb50',
      },
      printCustomerReceipt: false,
      printMerchantReceipt: false,
    })
  }, [])

  /**
   * Fetch price based on info from prev. step
   */
  const fetchPrice = React.useCallback(
    () =>
      getPriceForParking({
        ecv,
        parkingEnd,
        udr: udr.udrid,
        // TODO: add terminal info
        partnerId: '1',
        terminalId: '1',
      }),
    [ecv, parkingEnd, udr.udrid]
  )

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
  } = useQuery(['getPriceForParking', ecv, parkingEnd, udr.udrid], fetchPrice, {
    cacheTime: 0,
  })

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
            {/* TODO: what is status */}
            <Descriptions.Text>???</Descriptions.Text>
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
              {presentPrice(pricingInfo.priceTotal * 100)}
            </Descriptions.Text>
          </Descriptions.Item>
        </Descriptions>
        <Button.Group>
          <Button
            title={i18n.t('screens.parkingOrderSummary.actions.cashAction')}
            variant="primary-submit"
            onPress={payByCashHandler}
          />
          <Button
            title={i18n.t('screens.parkingOrderSummary.actions.cardAction')}
            onPress={payByCardHandler}
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
