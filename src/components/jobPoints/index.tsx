import JobPointsStyle from "./style";
import { ReactNode } from 'react'

type JobPointsProps = {
  children: ReactNode
  style?: {},
}

export const JobPoints = ({ children, ...rest }: JobPointsProps) => (
  <JobPointsStyle {...rest}>
    {children}
  </JobPointsStyle>
);
