import styled from 'styled-components/native'

export const PayByCashSC = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const ButtonWrapper = styled.View`
  width: 100%;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray};
  padding: 16px;
`
