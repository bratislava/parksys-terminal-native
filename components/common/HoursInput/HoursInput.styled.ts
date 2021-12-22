import { Typography } from '../../ui'
import styled from 'styled-components/native'

export const HoursInputSC = styled.View``

export const LeftButton = styled.TouchableOpacity`
  flex: 1;
  height: 80px;
  border-top-left-radius: 150px;
  border-bottom-left-radius: 150px;
  background: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
`

export const RightButton = styled.TouchableOpacity`
  flex: 1;
  height: 80px;
  border-top-right-radius: 150px;
  border-bottom-right-radius: 150px;
  background: ${({ theme }) => theme.colors.green};
  align-items: center;
  justify-content: center;
`

export const MinusText = styled(Typography)`
  color: ${({ theme }) => theme.colors.error};
  font-size: 50px;
  line-height: 50px;
`

export const PlusText = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 50px;
  line-height: 50px;
`

export const LabelText = styled(Typography)`
  color: ${({ theme }) => theme.colors.black};
  margin: 16px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
