/* eslint-disable react-native/no-raw-text */
import { Button, Descriptions } from '@components/ui'
import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, Alert } from 'react-native'
import { RootStackParamList } from 'types'
import {
  IconSC,
  IconWrapper,
  TransactionDetailSC,
} from './TransactionDetail.styled'
import i18n from 'i18n-js'
import { formatNativeDate } from '@utils/ui/dateUtils'
import { ZonedDateTime, ChronoUnit } from '@js-joda/core'
import { presentPrice } from '@utils/utils'
import TransactionState from '../../components/common/TransactionState'
import { printReceipt } from '@services/external/papaya.api'
import { generateReceiptForTransaction } from '@utils/terminal/cashReceipt'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ETicketState } from '@models/pricing/pricing.d'
import { captureException } from '@services/internal/sentry.service'
import { getUdrsInfo } from '@services/external/udrs.api'
import { handleLoadingDataFromPersistedStorage } from '@utils/PersistQueryClientProviderHelper'

const t = i18n.t

type TRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>

const TransactionDetail: React.FunctionComponent = () => {
  const { params } = useRoute<TRouteProp>()
  const { item } = params

  /**
   * Fetch udrs
   */
  const fetchUdrs = useCallback(() => {
    return getUdrsInfo().then((res) =>
      res.features
        .filter((udr) => udr.properties.Status === 'active')
        .sort((a, b) => {
          return a.properties['UDR ID'] - b.properties['UDR ID']
        })
    )
  }, [])

  const {
    data: udrs,
    error,
    isLoading,
  } = useQuery({ queryKey: ['getUdrs'], queryFn: fetchUdrs })

  const udr = React.useMemo(
    () =>
      udrs?.find(
        (udr) => udr.properties['UDR ID'].toString() === item.udr.toString()
      ),
    [item, udrs]
  )

  const handlePrintReceipt = React.useCallback(async () => {
    if (!item || !udr) {
      return
    }
    try {
      await printReceipt({
        printer: {},
        printData: generateReceiptForTransaction(item),
      })
    } catch (error) {
      captureException(error)
      Alert.alert(t('screens.transactionDetail.printError'))
    }
  }, [item, udr])

  const { mutate: onPrintPress, isPending: isPrinting } = useMutation({
    mutationKey: ['print-receipt-copy'],
    mutationFn: handlePrintReceipt,
  })

  /**
   * Calculate durations of parking for given end timestamp
   */
  const parkingEndDate = ZonedDateTime.parse(item.parking_end)
  const parkingStartDate = ZonedDateTime.parse(item.updated_at)
  const durationHours = parkingStartDate.until(parkingEndDate, ChronoUnit.HOURS)
  const durationMinutes = parkingStartDate
    .plusHours(durationHours)
    .until(parkingEndDate, ChronoUnit.MINUTES)

  const isPaidTicket =
    item.state === ETicketState.SUCCESS ||
    item.state === ETicketState.PAYMENT_SUCCESS

  const handleObtainingUdrsData = useCallback(
    (text: string) => {
      return handleLoadingDataFromPersistedStorage(udrs, isLoading, error, text)
    },
    [udrs, error, isLoading]
  )

  return (
    <TransactionDetailSC>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <IconWrapper>
          <IconSC state={item.state} size={64} style={styles.icon} />
          <TransactionState state={item.state} style={styles.title} />
        </IconWrapper>
        <Descriptions layout="vertical">
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingDescription.ecv')}
          >
            <Descriptions.Text>{item.ecv}</Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingDescription.street')}
          >
            <Descriptions.Text>
              {handleObtainingUdrsData(
                `${udr?.properties['Názov']} (${udr?.properties['Mestská časť']})`
              )}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingDescription.udr')}
          >
            <Descriptions.Text>
              {handleObtainingUdrsData(
                `${udr?.properties['UDR ID']} (${udr?.properties['Kód rezidentskej zóny']})`
              )}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingDescription.parkingEnd')}
          >
            <Descriptions.Text>
              {formatNativeDate(new Date(item.parking_end), 'd.M.yyyy HH:mm')}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingSummary.duration')}
          >
            <Descriptions.Text>
              {t('screens.transactionDetail.parkingSummary.durationString', {
                hours: durationHours,
                minutes: durationMinutes,
              })}
            </Descriptions.Text>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions layout="horizontal">
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingSummary.status')}
          >
            <Descriptions.Text>
              <TransactionState state={item.state} />
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingSummary.paymentType')}
          >
            <Descriptions.Text>
              {t(
                `screens.transactionDetail.parkingSummary.paymentType_${
                  item.payment_type || 'none'
                }`
              )}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingSummary.paymentTime')}
          >
            <Descriptions.Text>
              {isPaidTicket
                ? formatNativeDate(
                    new Date(item.updated_at),
                    'HH:mm, dd.MM.yyyy'
                  )
                : 'X'}
            </Descriptions.Text>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('screens.transactionDetail.parkingSummary.price')}
          >
            <Descriptions.Text>{presentPrice(item.price)}</Descriptions.Text>
          </Descriptions.Item>
        </Descriptions>
        {isPaidTicket ? (
          <Button
            style={styles.button}
            variant="primary-submit"
            title={t('screens.transactionDetail.printAction')}
            onPress={() => onPrintPress()}
            loading={isPrinting}
          />
        ) : null}
      </ScrollView>
    </TransactionDetailSC>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  icon: { padding: 0, marginLeft: -8 },
  button: {
    marginTop: 16,
  },
})

export default React.memo(TransactionDetail)
