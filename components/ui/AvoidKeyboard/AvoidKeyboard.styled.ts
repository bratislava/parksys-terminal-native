import styled from 'styled-components/native'
import { Platform, KeyboardAvoidingViewProps } from 'react-native'

export const AvoidKeyboardSC = styled.KeyboardAvoidingView.attrs<KeyboardAvoidingViewProps>(
  (props) => ({
    ...props,
    behavior: Platform.select({ ios: 'padding', android: 'height' }),
    enabled: true,
  })
)<KeyboardAvoidingViewProps>`
  flex: 1;
  background: transparent;
`
