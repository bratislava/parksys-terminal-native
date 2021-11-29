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
import {
  AvoidKeyboard,
  Button,
  DateTimePicker,
  Picker,
  Status,
} from '@components/ui'
import { useFormik } from 'formik'
import {
  initialValues as formInitialValues,
  validationSchema,
  EnterParkingForm,
} from './EnterParkingInfo.schema'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useQuery } from 'react-query'
import { getUdrsInfo } from '@services/external/pricing.api'
import secureStorageService from '@services/internal/secureStorage.service'
import i18n from 'i18n-js'
import { ZonedDateTime, convert } from '@js-joda/core'
import { TOneStackParamList } from 'types'

/**
 * Screen to enter customer data to purchase parking ticket
 */
const EnterParkingInfo: React.FunctionComponent = () => {
  const { push } = useNavigation<StackNavigationProp<TOneStackParamList>>()

  const [initialValues, setInitialValues] = React.useState({
    ...formInitialValues,
  })

  /**
   * Fetch udrs list and get last selected udr from storage
   */
  const fetchUdrs = React.useCallback(async () => {
    const initiallySelected = await secureStorageService.getSelectedUdr()
    const data = await getUdrsInfo()
    setInitialValues((o) => ({
      ...o,
      udr: initiallySelected ?? data[0]?.udrid ?? '',
    }))

    return data
  }, [])

  const {
    data: udrs,
    error: udrsError,
    isLoading: udrsLoading,
    refetch,
  } = useQuery('getudrsInfo', fetchUdrs)

  /**
   * After submit go to next screen
   */
  const onSubmit = React.useCallback(
    async (values: EnterParkingForm) => {
      await secureStorageService.setSelectedUdr(values.udr)
      const selectedUdr = udrs?.find((udr) => values.udr === udr.udrid)

      if (selectedUdr) {
        push('ParkingOrderSummary', {
          udr: selectedUdr,
          ecv: values.ecv,
          parkingEnd: values.parkingEnd.toISOString(),
        })
      }
    },
    [push, udrs]
  )

  const { values, errors, setFieldValue, submitForm, isValid } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  })

  if (udrsLoading) {
    return (
      <Status
        title={i18n.t('screens.enterParkingInfo.loading.title')}
        loading
        style={{ flex: 1 }}
      />
    )
  }

  if (udrsError) {
    return (
      <Status
        variant="error"
        title={i18n.t('screens.enterParkingInfo.error.title')}
        description={i18n.t('screens.enterParkingInfo.error.description')}
        extra={
          <Button
            title={i18n.t('screens.enterParkingInfo.error.action')}
            variant="primary"
            onPress={() => refetch()}
          />
        }
        style={{ flex: 1 }}
      />
    )
  }

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
              {udrs?.map((udr) => (
                <Picker.Item
                  key={udr.udrid}
                  value={udr.udrid}
                  label={udr.nazov}
                />
              ))}
            </Picker>
          </FormItem>
          <FormItem
            label={i18n.t('screens.enterParkingInfo.form.udr')}
            required
          >
            <Input value={values.udr} editable={false} />
          </FormItem>
          <DateWrapper>
            <FormItem
              label={i18n.t('screens.enterParkingInfo.form.udr')}
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
              />
            </FormItem>
            <FormItem
              label={i18n.t('screens.enterParkingInfo.form.udr')}
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
