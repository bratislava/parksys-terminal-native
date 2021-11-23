import * as React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { InputSC } from './Input.styled'

type InputProps = TextInputProps & {
  error?: boolean
}

const Input = (
  { error, ...rest }: InputProps,
  ref?: React.Ref<TextInput | null>
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <InputSC {...rest} ref={ref} error={error} />
}

export default React.forwardRef(Input)
