import styled from 'styled-components/native'

export const FormItemSC = styled.View`
  width: 100%;
  flex: 1;
  margin-bottom: 16px;
`
export const FormLabelText = styled.Text`
  margin-bottom: 8px;

  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`

export const FormLabelRequired = styled(FormLabelText)`
  color: ${({ theme }) => theme.colors.error};
`

export const ErrorText = styled(FormLabelText)`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.error};
`
