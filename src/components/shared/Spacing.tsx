import styled from '@emotion/styled'

interface SpacingProps {
  size?: number
  direction?: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SpacingProps>`
  ${({ size = 16, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
        height: ${size}px
        `
      : `
        width: ${size}px
      `}
`

export default Spacing
