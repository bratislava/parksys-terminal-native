import { Typography } from '@components/ui'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

const { width } = Dimensions.get('window')
const TILE_WIDTH = width / 2

export const HomeSC = styled(SafeAreaView)`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.black};
`

export const TileSC = styled.TouchableOpacity`
  width: ${TILE_WIDTH}px;
  height: 50%;

  padding: 8px;

  align-items: center;
  justify-content: center;
`

export const TileIcon = styled.Image`
  width: 60px;
  height: 60px;
`
export const TileText = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 16px;
`
