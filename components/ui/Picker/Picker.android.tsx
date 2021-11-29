import * as React from 'react'
import { Picker as BasePicker } from '@react-native-picker/picker'
import { PickerSC } from './Picker.styled'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'
import { PickerProps } from './pickerType'

type TPicker = <T>(
  props: PickerProps<T> & { ref?: React.ForwardedRef<BasePicker<T>> }
) => ReturnType<typeof _Picker>

const _Picker = <T extends any>(
  { children, dropdownIconColor, error, placeholder, ...rest }: PickerProps<T>,
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
        <Picker.Item value="" label={placeholder} />
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

export const Picker = React.forwardRef(_Picker) as unknown as TPicker & {
  Item: typeof BasePicker.Item
}

Picker.Item = BasePicker.Item
