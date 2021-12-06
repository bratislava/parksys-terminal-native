import { Status } from '@components/ui'
import styled from 'styled-components/native'

export const LoginSC = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.lightLightGray};
`

export const StatusSC = styled(Status)`
  margin-bottom: 16px;
`

export const LoginError = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin: 8px 0;
`
