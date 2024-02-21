import { ReactNode } from 'react'
import JobPointsStyle from './style'

type JobPointsProps = {
  children: ReactNode
  style?: {}
}

export const JobPoints = ({ children, ...rest }: JobPointsProps): JSX.Element => (
  <JobPointsStyle {...rest}>{children}</JobPointsStyle>
)
