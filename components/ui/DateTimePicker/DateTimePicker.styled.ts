import styled from 'styled-components/native'

export const DateTimePickerPlaceholder = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
`
export const DatePickerWrapper = styled.TouchableOpacity<{ error?: boolean }>`
  width: 100%;
  height: 48px;

  padding: 6px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 3px;
  border-width: 2px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.error : '#C5C5C5'};

  background-color: ${({ theme }) => theme.colors.white};
`
