import StyledTitle from "./style";
import { ReactElement } from 'react'
type TypeProps =  {
  children: ReactElement
  level?: number,
}
export const Title = ({ level = 1, children  }: TypeProps) => <StyledTitle level={level}>{children}</StyledTitle>;
