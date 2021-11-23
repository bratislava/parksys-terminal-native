import styled from 'styled-components/native'
import { TextInputProps } from 'react-native'

export const InputSC = styled.TextInput<TextInputProps & { error?: boolean }>`
  width: 100%;
  height: 39px;

  padding: 12px;

  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.error : 'transparent'};

  color: ${({ theme }) => theme.colors.black};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`
