import styled, { css } from 'styled-components/native'

type TVariant = 'body' | 'sectionTitle'

const Typography = styled.Text<{ variant?: TVariant }>`
  color: ${({ theme }) => theme.colors.black};

  ${({ variant }) => {
    switch (variant) {
      case 'sectionTitle':
        return css`
          font-size: 20px;
          font-weight: bold;
        `
      default:
        return css`
          font-size: 20px;
        `
    }
  }};
`

export default Typography
