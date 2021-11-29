import {
  PickerProps as BaseProps,
  PickerItemProps,
} from '@react-native-picker/picker'

export type PickerProps<T> = Omit<BaseProps<T>, 'children'> & {
  /**
   * Value indicating error
   */
  error?: boolean
  /**
   * Children with specific type
   */
  children?:
    | React.ReactElement<PickerItemProps>
    | React.ReactElement<PickerItemProps>[]
  /**
   * Text to display when no value
   */
  placeholder?: string
  /**
   * Style of container surrounding input
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Add empty element to enable select null value
   */
  clearable?: boolean
}
