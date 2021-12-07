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
import { DateTimeFormatter, ZonedDateTime, ChronoUnit } from '@js-joda/core'
import { useQuery } from 'react-query'
import { getPriceForParking } from '@services/external/pricing.api'
import { presentPrice } from '@utils/utils'
import { StackNavigationProp } from '@react-navigation/stack'

/**
 * Screen to show user summary about parking ticket before purchase
 */
const ParkingOrderSummary: React.FunctionComponent = () => {
  const {
    params: { ecv, parkingEnd, udr },
  } = useRoute<RouteProp<TOneStackParamList, 'ParkingOrderSummary'>>()
  const { canGoBack, goBack } =
    useNavigation<StackNavigationProp<TOneStackParamList>>()

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
              {parkingEndDate.format(
                DateTimeFormatter.ofPattern('d.M.yyyy HH:mm')
              )}
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
          <Descriptions.Item
            label={i18n.t('screens.parkingOrderSummary.parkingSummary.price')}
          >
            <Descriptions.Text>
              {presentPrice(pricingInfo.priceTotal * 100)}
            </Descriptions.Text>
          </Descriptions.Item>
        </ParkingSummarySC>
      </ScrollView>
      <ButtonWrapper>
        <Button.Group vertical>
          <Button
            title={i18n.t('screens.parkingOrderSummary.actions.cashAction')}
            variant="primary-submit"
          />
          <Button
            title={i18n.t('screens.parkingOrderSummary.actions.cardAction')}
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
})

export default React.memo(ParkingOrderSummary)
