import { Button } from '@components/ui'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const PaymentStatusSC = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
`

export const ActionButton = styled(Button)`
  margin-top: 16px;
`
