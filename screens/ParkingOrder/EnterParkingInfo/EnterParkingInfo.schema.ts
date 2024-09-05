import * as Yup from 'yup'
import { ZonedDateTime } from '@js-joda/core'

const ECV_REGEX = /^[A-Z|0-9]*$/gm

export interface EnterParkingForm {
  udr: string
  parkingEnd: Date
  ecv: string
}

export const validationSchema: Yup.SchemaOf<EnterParkingForm> = Yup.object({
  udr: Yup.string()
    .default('')
    .required('screens.enterParkingInfo.formErrors.udrRequired'),
  parkingEnd: Yup.date()
    .test(
      'date-test-min',
      'screens.enterParkingInfo.formErrors.minDate',
      (value) => {
        if (!value) {
          return true
        }
        const selected = ZonedDateTime.parse(value.toISOString())
        const min = ZonedDateTime.now()

        return selected.isAfter(min)
      }
    )
    .test(
      'date-test-max',
      'screens.enterParkingInfo.formErrors.maxDate',
      (value) => {
        if (!value) {
          return true
        }
        const selected = ZonedDateTime.parse(value.toISOString())
        const max = ZonedDateTime.now().plusHours(48)

        return max.isAfter(selected)
      }
    )
    .default(new Date())
    .required(),
  ecv: Yup.string()
    .matches(ECV_REGEX, 'screens.enterParkingInfo.formErrors.ecvFormat')
    .default('')
    .required('screens.enterParkingInfo.formErrors.ecvRequired'),
})

export const initialValues: EnterParkingForm =
  validationSchema.getDefault() as EnterParkingForm
