import styled from 'styled-components/native'

export const DateTimePickerPlaceholder = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`
export const DatePickerWrapper = styled.TouchableOpacity<{ error?: boolean }>`
  width: 100%;
  height: 39px;

  padding: 12px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.error : 'transparent'};

  background-color: ${({ theme }) => theme.colors.white};
`
