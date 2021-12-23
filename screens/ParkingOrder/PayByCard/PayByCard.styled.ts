import styled from 'styled-components/native'

export const PayByCardSC = styled.View`
  flex: 1;
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

export const HomeSC = styled.Image`
  width: 30px;
  height: 30px;
`
