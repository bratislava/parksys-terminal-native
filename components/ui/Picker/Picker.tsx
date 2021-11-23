import * as React from 'react'
import {
  PickerProps as BaseProps,
  Picker as BasePicker,
  PickerItemProps,
} from '@react-native-picker/picker'
import { PickerSC } from './Picker.styled'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'

type PickerProps<T> = Omit<BaseProps<T>, 'children'> & {
  error?: boolean
  children?:
    | React.ReactElement<PickerItemProps<T>>
    | React.ReactElement<PickerItemProps<T>>[]
}

type TPicker = <T>(
  props: PickerProps<T> & { ref?: React.ForwardedRef<BasePicker<T>> }
) => ReturnType<typeof Picker>

const Picker = <T extends any>(
  { children, dropdownIconColor, error, ...rest }: PickerProps<T>,
  ref: React.Ref<BasePicker<T>>
) => {
  const theme = useTheme()
  return (
    <PickerSC error={error}>
      <BasePicker
        {...rest}
        ref={ref}
        dropdownIconColor={
          error ? theme.colors.error : dropdownIconColor ?? theme.colors.black
        }
      >
        {Platform.OS === 'android' && children
          ? React.Children.map(children, (child) =>
              React.cloneElement(child, {
                ...child.props,
                style: {
                  ...(child.props.style && typeof child.props.style === 'object'
                    ? child.props.style
                    : {}),
                  fontSize: 12,
                  lineHeight: 14,
                },
              })
            )
          : children}
      </BasePicker>
    </PickerSC>
  )
}

const ForwardedPicker = React.forwardRef(Picker) as unknown as TPicker & {
  Item: typeof BasePicker.Item
}

ForwardedPicker.Item = BasePicker.Item

export default ForwardedPicker
