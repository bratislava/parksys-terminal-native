import * as React from 'react'
import { StyleSheet } from 'react-native'
import FormItem from '@components/form/FormItem'
import Input from '@components/ui/Input'
import {
  ButtonWrapper,
  DateWrapper,
  EnterParkingInfoSC,
  FormWrapper,
} from './EnterParkingInfo.styled'
import { AvoidKeyboard, Button, DateTimePicker, Picker } from '@components/ui'
import { useFormik } from 'formik'
import { validationSchema, EnterParkingForm } from './EnterParkingInfo.schema'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import secureStorageService from '@services/internal/secureStorage.service'
import i18n from 'i18n-js'
import { ZonedDateTime, convert } from '@js-joda/core'
import { TOneStackParamList } from 'types'
import UDRS from 'constants/udrs'

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

  useFocusEffect(resetForm)

  return (
    <EnterParkingInfoSC>
      <AvoidKeyboard useHeaderOffset>
        <FormWrapper contentContainerStyle={styles.formStyle}>
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
                  label={`${udr.nazov} (UDR ${udr.udrid})`}
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
        </FormWrapper>
      </AvoidKeyboard>
      <ButtonWrapper>
        <Button
          title={i18n.t('screens.enterParkingInfo.form.submitAction')}
          onPress={submitForm}
          variant={isValid ? 'primary-submit' : 'secondary'}
        />
      </ButtonWrapper>
    </EnterParkingInfoSC>
  )
}

const styles = StyleSheet.create({
  formStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  dateItemRight: {
    flex: 1,
    marginLeft: 4,
  },
  dateItemLeft: {
    flex: 1,
    marginRight: 4,
  },
})

export default React.memo(EnterParkingInfo)
