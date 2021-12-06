import styled, { DefaultTheme } from 'styled-components/native'

export type TStatusVariant = 'info' | 'error' | 'warn' | 'default'

interface ComponentProps {
  variant: TStatusVariant
}

export function getColor(theme: DefaultTheme, variant: TStatusVariant) {
  switch (variant) {
    case 'info':
      return theme.colors.info
    case 'warn':
      return theme.colors.warn
    case 'error':
      return theme.colors.error
    default:
      return theme.colors.black
  }
}

export const StatusSC = styled.View`
  align-items: center;
  justify-content: center;
`

export const StatusText = styled.Text<
  ComponentProps & { hasDescription?: boolean }
>`
  margin-top: 8px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ hasDescription }) => (hasDescription ? 0 : 24)}px;
  color: ${({ theme, variant }) => getColor(theme, variant)};
`

export const StatusDescription = styled.Text`
  margin-top: 8px;
  margin-bottom: 24px;
  text-align: center;
  font-size: 16px;

  color: ${({ theme }) => theme.colors.secondary};
`
