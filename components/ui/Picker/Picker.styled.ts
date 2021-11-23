import { Platform } from 'react-native'
import styled, { css } from 'styled-components/native'

export const PickerSC = styled.View<{ error?: boolean }>`
  width: 100%;

  ${Platform.OS === 'android'
    ? css`
        justify-content: center;
        height: 39px;
        padding: 6px 0px;
        padding-left: 4px;
        border: none;
        border-radius: 3px;
        background-color: ${({ theme }) => theme.colors.white};
      `
    : ''};

  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.error : 'transparent'};
`
