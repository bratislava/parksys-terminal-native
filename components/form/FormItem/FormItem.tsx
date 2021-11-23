import * as React from 'react'
import {
  ErrorText,
  FormItemSC,
  FormLabelRequired,
  FormLabelText,
} from './FormItem.styled'

interface FormItemProps {
  label: string
  required?: boolean
  error?: React.ReactNode
}

/**
 * Wrapper for form item such as Input... to provide label and form style
 */
const FormItem: React.FunctionComponent<FormItemProps> = ({
  label,
  required,
  error,
  children,
}) => {
  return (
    <FormItemSC>
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
