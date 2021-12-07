import styled from 'styled-components/native'

export const TerminalSettingsSC = styled.View``

export const SettingsItem = styled.View`
  padding: 8px 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
`

export const SectionTitle = styled.Text`
  margin-bottom: 8px;

  font-size: 18px;
  font-weight: bold;
`

export const ItemLabel = styled.Text`
  flex: 1;
`
