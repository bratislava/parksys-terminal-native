import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@components/ui'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const WIDTH = Dimensions.get('screen').width
const BUTTON_SIZE = (WIDTH - 100) / 2

export const EnterParkingInfoSC = styled(SafeAreaView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.lightLightGray};
`

export const FormWrapper = styled.ScrollView`
  /* flex: 1; */
`

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray};
  padding: 16px;
`

export const ErrorWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
export const DateWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ButtonGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;
`

export const GridButton = styled(Button)`
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  margin: 4px;
`

export const TimeText = styled.Text`
  font-size: 24px;
  margin-right: 16px;
`
