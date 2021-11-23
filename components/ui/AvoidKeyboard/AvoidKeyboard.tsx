import React from 'react'
import { KeyboardAvoidingViewProps } from 'react-native'
import { AvoidKeyboardSC } from './AvoidKeyboard.styled'
import { useHeaderHeight } from '@react-navigation/stack'

interface AvoidKeyboardProps extends KeyboardAvoidingViewProps {
  /**
   * Use offset of header from react navigation
   */
  useHeaderOffset?: boolean
}

const AvoidKeyboard: React.FunctionComponent<AvoidKeyboardProps> = ({
  children,
  style,
  useHeaderOffset,
  keyboardVerticalOffset,
  ...rest
}) => {
  const headerHeight = useHeaderHeight()
  return (
    <AvoidKeyboardSC
      style={style as any}
      keyboardVerticalOffset={
        useHeaderOffset ? headerHeight : keyboardVerticalOffset
      }
      {...rest}
    >
      {children}
    </AvoidKeyboardSC>
  )
}

export default AvoidKeyboard
