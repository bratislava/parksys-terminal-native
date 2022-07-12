import { Descriptions, Typography } from '@components/ui'
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
`

export const ParkingSummarySC = styled(Descriptions)`
  margin-top: 0px;
`

export const StatusWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const ButtonSC = styled.TouchableOpacity`
  width: 180px;
  height: 150px;
  align-items: center;
  justify-content: center;
`

export const CashButton = styled(ButtonSC)`
  background: ${({ theme }) => theme.colors.black};
`

export const CardButton = styled(ButtonSC)`
  background: ${({ theme }) => theme.colors.green};
`

export const IconSC = styled.Image`
  width: 30px;
  height: 30px;
`

export const TextSC = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 19px;
  padding-bottom: 10px;
`

export const TextPriceSC = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 40px;
  padding-top: 10px;
`
