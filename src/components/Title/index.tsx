import { ReactElement } from 'react'
import StyledTitle from './style'
type TypeProps = {
  children: ReactElement
  level?: number
}
export const Title = ({ level = 1, children }: TypeProps): JSX.Element => (
  <StyledTitle level={level}>{children}</StyledTitle>
)
