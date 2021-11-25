import styled from 'styled-components/native'

export const EnterParkingInfoSC = styled.View`
  flex: 1;

  background: ${({ theme }) => theme.colors.lightLightGray};
`

export const FormWrapper = styled.ScrollView`
  /* flex: 1; */
`

export const ButtonWrapper = styled.View`
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
