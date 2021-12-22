import TransactionStateIcon from '@components/common/TransactionStateIcon'
import styled from 'styled-components/native'

export const TransactionDetailSC = styled.View``

export const IconSC = styled(TransactionStateIcon)`
  /* margin-bottom: 16px; */
`

export const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
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
