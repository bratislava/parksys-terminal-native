import React from 'react'
import { Platform } from 'react-native'
import { TPickerDate } from './types'

/**
 * Component for selecting date in form.
 * Based on @react-native-community/datetimepicker.
 */
export const DateTimePicker: TPickerDate = () => {
  React.useEffect(() => {
    console.warn(`PickerDate is not supported on: ${Platform.OS}`)
  }, [])
  return null
}
