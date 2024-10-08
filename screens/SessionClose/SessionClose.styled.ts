import { Typography } from '@components/ui'
import styled from 'styled-components/native'

export const SessionCloseSC = styled.View`
  flex: 1;
`

export const ButtonWrapper = styled.View`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray};
  padding: 16px;
`

export const SectionTitle = styled(Typography)`
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 14px;
`
