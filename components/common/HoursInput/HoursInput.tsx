/* eslint-disable react-native/no-raw-text */
import React from 'react'
import {
  HoursInputSC,
  LabelText,
  LeftButton,
  MinusText,
  PlusText,
  RightButton,
  ButtonWrapper,
} from './HoursInput.styled'

interface HoursInputProps {
  label: string
  onAdd: () => void
  onSub: () => void
}

const HoursInput: React.FunctionComponent<HoursInputProps> = ({
  label,
  onAdd,
  onSub,
}) => {
  return (
    <HoursInputSC>
      <LabelText>{label}</LabelText>
      <ButtonWrapper>
        <LeftButton onPress={onSub}>
          <MinusText>-</MinusText>
        </LeftButton>
        <RightButton onPress={onAdd}>
          <PlusText>+</PlusText>
        </RightButton>
      </ButtonWrapper>
    </HoursInputSC>
  )
}

export default HoursInput
