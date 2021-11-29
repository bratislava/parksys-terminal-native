import React from 'react'
import { Picker as BasePicker } from '@react-native-picker/picker'
import { Platform } from 'react-native'
import { PickerProps } from './pickerType'

type TPicker = <T>(
  props: PickerProps<T> & { ref?: React.ForwardedRef<BasePicker<T>> }
) => ReturnType<typeof _Picker>

/**
 * Component for selecting one value.
 * It uses native android picker and Modal with native picker on iOS
 */
export const _Picker = <T extends any>() => {
  React.useEffect(() => {
    console.warn(`PickerSelect is not supported on: ${Platform.OS}`)
  }, [])
  return null
}

export const Picker = React.forwardRef(_Picker) as unknown as TPicker & {
  Item: typeof BasePicker.Item
}

Picker.Item = BasePicker.Item
