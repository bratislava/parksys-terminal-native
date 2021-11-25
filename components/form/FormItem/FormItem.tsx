import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import {
  ErrorText,
  FormItemSC,
  FormLabelRequired,
  FormLabelText,
} from './FormItem.styled'

interface FormItemProps {
  /**
   * Label of form input
   */
  label: string
  /**
   * Show astrict by name
   */
  required?: boolean
  /**
   * Display error below field
   */
  error?: React.ReactNode
  /**
   * Style of container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Wrapper for form item such as Input... to provide label and form style
 */
const FormItem: React.FunctionComponent<FormItemProps> = ({
  label,
  required,
  error,
  children,
  style,
}) => {
  return (
    <FormItemSC style={style as any}>
      <FormLabelText>
        {label}
        {/* eslint-disable-next-line react-native/no-raw-text */}
        {required ? <FormLabelRequired>{` *`}</FormLabelRequired> : null}
      </FormLabelText>
      {React.Children.toArray(children).map((child: any) =>
        React.cloneElement(child, { error: !!error })
      )}
      {error ? <ErrorText>{error}</ErrorText> : null}
    </FormItemSC>
  )
}

export default FormItem
