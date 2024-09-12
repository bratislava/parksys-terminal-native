/* eslint-disable react-native/no-raw-text */
import * as React from 'react'
import { StyleSheet } from 'react-native'
import FormItem from '@components/form/FormItem'
import Input from '@components/ui/Input'
import {
  ButtonWrapper,
  DateWrapper,
  EnterParkingInfoSC,
  FormWrapper,
  TimeText,
} from './EnterParkingInfo.styled'
import { AvoidKeyboard, Button, DateTimePicker, Picker } from '@components/ui'
import { useFormik } from 'formik'
import { validationSchema, EnterParkingForm } from './EnterParkingInfo.schema'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import secureStorageService from '@services/internal/secureStorage.service'
import i18n from 'i18n-js'
import {
  ZonedDateTime,
  convert,
  LocalDateTime,
  Instant,
  nativeJs,
} from '@js-joda/core'
import { RootStackParamList } from 'types'
import { calculateTimeDifference } from '@utils/ui/dateUtils'
import HoursInput from '@components/common/HoursInput'
import { useCallback, useEffect, useState } from 'react'
import { getUdrsInfo } from '@services/external/udrs.api'
import { useQuery } from '@tanstack/react-query'
import asyncStorageService from '@services/internal/asyncStorage.service'
import { IUdrFeaturesInfo } from '@models/pricing/udr/udr'

/**
 * Screen to enter customer data to purchase parking ticket
 */
const EnterParkingInfo: React.FunctionComponent = () => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [initialValues, setInitialValues] = useState(
    () =>
      ({
        ...validationSchema.getDefault(),
        parkingEnd: new Date(),
      } as EnterParkingForm)
  )

  const [udrsDataState, setUdrsDataState] = useState<IUdrFeaturesInfo[] | null>(
    null
  )

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
    // TODO this error should be properly handled, but for now it's left out until sentry is removed from project
    error,
    isLoading,
  } = useQuery({ queryKey: ['getUdrs'], queryFn: fetchUdrs, gcTime: 0 })

  useEffect(() => {
    const setUdrsToStorage = async () => {
      if (udrs) {
        await asyncStorageService.setUdrs(udrs)
      }
    }
    setUdrsToStorage()
  }, [udrs])

  useEffect(() => {
    const rehydrate = async () => {
      const storedState = await asyncStorageService.getUdrs()
      setUdrsDataState(storedState)
    }
    rehydrate()
  }, [setUdrsDataState])

  /**
   * Fetch udrs list and get last selected udr from storage
   */
  const initForm = React.useCallback(async () => {
    const initiallySelected = await secureStorageService.getSelectedUdr()
    if (udrsDataState) {
      setInitialValues((o) => ({
        ...o,
        udr:
          initiallySelected ??
          udrsDataState[0].properties['UDR ID'].toString() ??
          '',
      }))
    }
  }, [udrsDataState])

  /**
   * After submit go to next screen
   */
  const onSubmit = React.useCallback(
    async (values: EnterParkingForm) => {
      await secureStorageService.setSelectedUdr(values.udr)
      const selectedUdr = udrsDataState?.find(
        (udr) => values.udr === udr.properties['UDR ID'].toString()
      )

      if (selectedUdr) {
        push('ParkingOrderSummary', {
          udr: {
            udrid: selectedUdr.properties['UDR ID'].toString(),
            nazov: selectedUdr.properties['Názov'],
            mestskaCast: selectedUdr.properties['Mestská časť'],
            kodZony: selectedUdr.properties['Kód rezidentskej zóny'],
          },
          ecv: values.ecv,
          parkingEnd: values.parkingEnd.toISOString(),
        })
      }
    },
    [push, udrsDataState]
  )

  const addTime = React.useCallback(
    (current: Date, minutes: number, seconds = 0) => {
      let newDate = LocalDateTime.ofInstant(Instant.from(nativeJs(current)))

      /** check if plus or minus */
      if (minutes < 0) {
        newDate = newDate.minusMinutes(Math.abs(minutes))
      } else {
        newDate = newDate.plusMinutes(minutes)
      }

      if (seconds < 0) {
        newDate = newDate.minusSeconds(Math.abs(seconds))
      } else {
        newDate = newDate.plusSeconds(seconds)
      }

      /** check if we ate still in future */
      if (newDate.isBefore(LocalDateTime.now())) {
        newDate = LocalDateTime.now()
      }

      /** convert to js */
      return convert(newDate).toDate()
    },
    []
  )
  /**
   * Init form on mount
   */
  React.useEffect(() => {
    setEndDateOrTimeInputTouched(false)
    initForm()
  }, [initForm])

  const { values, errors, setFieldValue, submitForm, isValid, resetForm } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
      enableReinitialize: true,
    })

  const { hours, minutes } = calculateTimeDifference(
    new Date(),
    values.parkingEnd
  )

  useFocusEffect(resetForm)

  const [wasEndDateOrTimeInputTouched, setEndDateOrTimeInputTouched] =
    React.useState<boolean>(false)

  const onDateTimeChange = (d: Date | undefined) => {
    setEndDateOrTimeInputTouched(true)
    setFieldValue('parkingEnd', d)
  }

  // this is causing rerendering, is it ok?
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!wasEndDateOrTimeInputTouched) {
        setFieldValue('parkingEnd', addTime(values.parkingEnd, 0, 1))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [values, addTime, setFieldValue, wasEndDateOrTimeInputTouched])

  return (
    <EnterParkingInfoSC edges={['bottom']}>
      <AvoidKeyboard useHeaderOffset>
        <FormWrapper
          contentContainerStyle={styles.formStyle}
          keyboardShouldPersistTaps="handled"
        >
          <FormItem
            label={i18n.t('screens.enterParkingInfo.form.ecv')}
            required
            error={errors.ecv ? i18n.t(errors.ecv) : undefined}
          >
            <Input
              value={values.ecv}
              onChangeText={(text) => setFieldValue('ecv', text.toUpperCase())}
              onEndEditing={() =>
                setFieldValue('ecv', values.ecv.toUpperCase())
              }
              autoFocus
              autoCapitalize="characters"
            />
          </FormItem>
          <FormItem
            label={i18n.t('screens.enterParkingInfo.form.ulica')}
            required
            error={errors.udr ? i18n.t(errors.udr) : undefined}
          >
            <Picker
              selectedValue={values.udr}
              mode="dropdown"
              onValueChange={(itemValue) => setFieldValue('udr', itemValue)}
            >
              {udrsDataState?.map((udr) => (
                <Picker.Item
                  key={udr.properties['UDR ID']}
                  value={udr.properties['UDR ID'].toString()}
                  label={`(${udr.properties['UDR ID']}) ${udr.properties['Názov']}`}
                />
              ))}
            </Picker>
          </FormItem>
          <DateWrapper>
            <FormItem
              label={i18n.t('screens.enterParkingInfo.form.date')}
              error={
                errors.parkingEnd
                  ? i18n.t(errors.parkingEnd as string)
                  : undefined
              }
              required
              style={styles.dateItemLeft}
            >
              <DateTimePicker
                value={values.parkingEnd}
                mode="date"
                onChange={(d) => onDateTimeChange(d)}
                minimumDate={new Date()}
                maximumDate={convert(
                  ZonedDateTime.now().plusHours(48)
                ).toDate()}
                display="spinner"
              />
            </FormItem>
            <FormItem
              label={i18n.t('screens.enterParkingInfo.form.time')}
              error={
                errors.parkingEnd
                  ? i18n.t(errors.parkingEnd as string)
                  : undefined
              }
              required
              style={styles.dateItemRight}
            >
              <DateTimePicker
                value={values.parkingEnd}
                mode="time"
                onChange={(d) => onDateTimeChange(d)}
                minimumDate={new Date()}
                maximumDate={convert(
                  ZonedDateTime.now().plusHours(48)
                ).toDate()}
                display="spinner"
              />
            </FormItem>
          </DateWrapper>
          <HoursInput
            label="1 Hodina"
            onAdd={() =>
              setFieldValue('parkingEnd', addTime(values.parkingEnd, 60))
            }
            onSub={() =>
              setFieldValue('parkingEnd', addTime(values.parkingEnd, -60))
            }
          />
          <HoursInput
            label="15 minút"
            onAdd={() =>
              setFieldValue('parkingEnd', addTime(values.parkingEnd, 15))
            }
            onSub={() =>
              setFieldValue('parkingEnd', addTime(values.parkingEnd, -15))
            }
          />

          <Button
            title={i18n.t('screens.enterParkingInfo.form.resetAction')}
            onPress={() =>
              resetForm({
                values: {
                  ...initialValues,
                  parkingEnd: new Date(),
                },
              })
            }
            variant="danger"
            style={styles.button}
          />
        </FormWrapper>
      </AvoidKeyboard>
      <ButtonWrapper>
        <TimeText>{`${hours}h ${minutes}m`}</TimeText>
        <Button
          title={i18n.t('screens.enterParkingInfo.form.submitAction')}
          onPress={submitForm}
          variant={isValid ? 'primary-submit' : 'secondary'}
          style={styles.confirmButton}
        />
      </ButtonWrapper>
    </EnterParkingInfoSC>
  )
}

const styles = StyleSheet.create({
  formStyle: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  dateItemRight: {
    flex: 1,
    marginLeft: 4,
  },
  dateItemLeft: {
    flex: 1,
    marginRight: 4,
  },
  button: {
    marginTop: 16,
  },
  confirmButton: {
    flex: 1,
  },
})

export default React.memo(EnterParkingInfo)
