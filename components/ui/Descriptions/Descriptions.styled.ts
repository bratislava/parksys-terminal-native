import styled, { css } from 'styled-components/native'
import Typography from '../Typography'

export type TLayout = 'vertical' | 'horizontal'

interface IStyledProps {
  layout?: TLayout
}

export const DescriptionsSC = styled.View`
  flex-shrink: 1;
`

export const DescriptionsItemSC = styled.View`
  flex-direction: row;
  align-items: center;
`

export const DescriptionsContentSC = styled.View<IStyledProps>`
  padding: 8px 0;
  flex: 1;

  ${({ layout }) => {
    if (layout === 'horizontal') {
      return css`
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 0;
      `
    }

    return css`
      flex-direction: column;
    `
  }};
`

interface IItemStyledProps {
  layout?: TLayout
  last?: boolean
}

export const DescriptionContentSC = styled.View<IItemStyledProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  max-width: 50%;

  ${({ layout }) =>
    layout === 'vertical'
      ? css`
          width: 100%;
          max-width: 100%;
        `
      : ''};
`

export const DescriptionLabelSC = styled(
  DescriptionContentSC
)<IItemStyledProps>`
  justify-content: flex-start;
  font-weight: bold;

  ${({ layout }) =>
    layout === 'vertical'
      ? css`
          width: 100%;
          justify-content: flex-start;
        `
      : ''};
`

export const DescriptionLabelTextSC = styled(Typography)`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
`

export const DescriptionContentTextSC = styled(Typography)`
  font-size: 20px;
`

export const PrefixSC = styled.View`
  margin-right: 16px;
`
