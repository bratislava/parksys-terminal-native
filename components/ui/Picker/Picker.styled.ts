import Typography from '../Typography'
import { Platform } from 'react-native'
import styled, { css } from 'styled-components/native'

export const PickerSC = styled.View<{ error?: boolean }>`
  width: 100%;

  ${Platform.OS === 'android'
    ? css`
        justify-content: center;
        height: 48px;
        padding: 6px 0px;
        padding-left: 4px;
        border: none;
        border-radius: 3px;
        background-color: ${({ theme }) => theme.colors.white};
      `
    : ''};

  border-radius: 3px;
  border-width: 2px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.error : '#C5C5C5'};
`

export const PickerWrapper = styled.TouchableOpacity<{ error?: boolean }>`
  width: 100%;
  height: 48px;

  padding: 6px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 3px;
  border-width: 2px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.error : '#C5C5C5'};

  background-color: ${({ theme }) => theme.colors.white};
`

export const PickerPlaceholder = styled(Typography)`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`
