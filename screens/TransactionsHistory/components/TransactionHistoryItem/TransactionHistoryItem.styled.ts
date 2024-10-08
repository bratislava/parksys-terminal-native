import styled from 'styled-components/native'

export const TransactionHistoryItemSC = styled.TouchableOpacity<{
  odd: boolean
}>`
  padding: 12px 16px;

  flex-direction: row;
  align-items: center;
  background: ${({ theme, odd }) =>
    odd ? theme.colors.white : theme.colors.lightLightGray};
`

export const ECVText = styled.Text`
  flex: 1;
`

export const PriceText = styled.Text`
  text-align: right;
  padding: 0 16px;
`

export const DateText = styled.Text`
  flex: 1;
  text-align: right;
  margin-right: 8px;
`

export const ItemSeparator = styled.View`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray};
`
