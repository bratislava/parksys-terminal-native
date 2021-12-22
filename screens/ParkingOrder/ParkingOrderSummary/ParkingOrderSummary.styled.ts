import { Descriptions } from '@components/ui'
import styled from 'styled-components/native'

export const ParkingOrderSummarySC = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.lightLightGray};
`
export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray};
  padding: 16px;
`

export const ParkingSummarySC = styled(Descriptions)`
  margin-top: 0px;
`

export const StatusWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
