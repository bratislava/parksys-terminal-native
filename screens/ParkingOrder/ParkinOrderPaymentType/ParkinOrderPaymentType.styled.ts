import { Typography } from '@components/ui'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const ParkinOrderPaymentTypeSC = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  padding: 25px;
`

export const ButtonSC = styled.TouchableOpacity`
  width: 180px;
  height: 180px;
  border-radius: 100px;
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
  width: 60px;
  height: 60px;
`

export const TextSC = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`
