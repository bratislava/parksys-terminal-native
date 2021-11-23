import styled from 'styled-components/native'

export const NotFoundScreenSC = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  padding: 20px;
`

export const TitleSC = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

export const LinkSC = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 0 15px;
`

export const LinkText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`
