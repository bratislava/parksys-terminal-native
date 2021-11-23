import {
  IOSNativeProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker'
import { StyleProp, ViewStyle } from 'react-native'

export type PickerDateProps = (
  | Omit<IOSNativeProps, 'value' | 'onChange'>
  | Omit<AndroidNativeProps, 'value' | 'onChange'>
) & {
  /**
   * On change callback
   */
  onChange?: (date?: Date) => void
  /**
   * Text to display when no value
   */
  placeholder?: string
  /**
   * Style of container surrounding input
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * Value of input
   */
  value?: Date
  /**
   * Render function to replace default appearance of clickable element
   */
  customFormItemRenderer?: (onPress: () => void, value?: Date) => JSX.Element
  /**
   * Mode of picker
   */
  mode?: 'date' | 'time' | 'datetime'
  /**
   * Indicate error
   */
  error?: boolean
}

export type TPickerDate = React.FunctionComponent<PickerDateProps>
