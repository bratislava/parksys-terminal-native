/* eslint-disable react-native/no-raw-text */
import * as React from 'react'
import { StyleSheet } from 'react-native'
import FormItem from '@components/form/FormItem'
import Input from '@components/ui/Input'
import {
  ButtonGrid,
  ButtonWrapper,
  DateWrapper,
  EnterParkingInfoSC,
  FormWrapper,
  GridButton,
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
import { TOneStackParamList } from 'types'
import UDRS from 'constants/udrs'
import { calculateTimeDifference } from '@utils/ui/dateUtils'

/**
 * Screen to enter customer data to purchase parking ticket
 */
const EnterParkingInfo: React.FunctionComponent = () => {
  const { push } = useNavigation<StackNavigationProp<TOneStackParamList>>()

  const [initialValues, setInitialValues] = React.useState(
    () =>
      ({
        ...validationSchema.getDefault(),
        parkingEnd: new Date(),
      } as EnterParkingForm)
  )

  /**
   * Fetch udrs list and get last selected udr from storage
   */
  const initForm = React.useCallback(async () => {
    const initiallySelected = await secureStorageService.getSelectedUdr()
    const data = UDRS
    setInitialValues((o) => ({
      ...o,
      udr: initiallySelected ?? data[0]?.udrid ?? '',
    }))

    return data
  }, [])

  /**
   * After submit go to next screen
   */
  const onSubmit = React.useCallback(
    async (values: EnterParkingForm) => {
      await secureStorageService.setSelectedUdr(values.udr)
      const selectedUdr = UDRS.find((udr) => values.udr === udr.udrid)

      if (selectedUdr) {
        push('ParkingOrderSummary', {
          udr: selectedUdr,
          ecv: values.ecv,
          parkingEnd: values.parkingEnd.toISOString(),
        })
      }
    },
    [push]
  )

  const addTime = React.useCallback((current: Date, minutes: number) => {
    let newDate = LocalDateTime.ofInstant(Instant.from(nativeJs(current)))

    /** check if plus or minus */
    if (minutes < 0) {
      newDate = newDate.minusMinutes(Math.abs(minutes))
    } else {
      newDate = newDate.plusMinutes(minutes)
    }

    /** check if we ate still in future */
    if (newDate.isBefore(LocalDateTime.now())) {
      if (minutes < 0) {
        newDate = LocalDateTime.now().minusMinutes(Math.abs(minutes))
      } else {
        newDate = LocalDateTime.now().plusMinutes(minutes)
      }
    }

    /** convert to js */
    return convert(newDate).toDate()
  }, [])
  /**
   * Init form on mount
   */
  React.useEffect(() => {
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

  return (
    <EnterParkingInfoSC>
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
              onChangeText={(text) => setFieldValue('ecv', text)}
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
              {UDRS.map((udr) => (
                <Picker.Item
                  key={udr.udrid}
                  value={udr.udrid}
                  label={`(${udr.udrid}) ${udr.nazov}`}
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
                onChange={(d) => setFieldValue('parkingEnd', d)}
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
                onChange={(d) => setFieldValue('parkingEnd', d)}
                minimumDate={new Date()}
                maximumDate={convert(
                  ZonedDateTime.now().plusHours(48)
                ).toDate()}
                display="spinner"
              />
            </FormItem>
          </DateWrapper>
          <ButtonGrid>
            <GridButton
              title="+1h"
              variant="primary-submit"
              onPress={() =>
                setFieldValue('parkingEnd', addTime(values.parkingEnd, 60))
              }
              contentContainerStyle={styles.buttonContent}
            />

            <GridButton
              title="+0.5h"
              variant="primary-submit"
              onPress={() =>
                setFieldValue('parkingEnd', addTime(values.parkingEnd, 30))
              }
              contentContainerStyle={styles.buttonContent}
            />
            <GridButton
              title="-1h"
              variant="primary"
              onPress={() =>
                setFieldValue('parkingEnd', addTime(values.parkingEnd, -60))
              }
              contentContainerStyle={styles.buttonContent}
            />
            <GridButton
              title="-0.5h"
              variant="primary"
              onPress={() =>
                setFieldValue('parkingEnd', addTime(values.parkingEnd, -30))
              }
              contentContainerStyle={styles.buttonContent}
            />
          </ButtonGrid>
          <Button
            title={i18n.t('screens.enterParkingInfo.form.nowAction')}
            onPress={() => setFieldValue('parkingEnd', new Date())}
            variant="secondary"
            style={styles.button}
          />
          <Button
            title={i18n.t('screens.enterParkingInfo.form.resetAction')}
            onPress={() => resetForm()}
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
  buttonContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default React.memo(EnterParkingInfo)
