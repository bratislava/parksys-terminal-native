import { Typography } from '@components/ui'
import styled from 'styled-components/native'

export const PayByCashSC = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray};
  padding: 16px;
`

export const AmountText = styled(Typography)`
  font-size: 28px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.green};
`

export const HomeSC = styled.Image`
  width: 30px;
  height: 30px;
`
