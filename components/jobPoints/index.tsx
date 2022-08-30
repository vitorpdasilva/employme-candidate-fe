import JobPointsStyle from "./style";
import { ReactNode } from 'react'

type JobPointsProps = {
  children: ReactNode
  style: {},
}

const JobPoints = ({ children, ...rest }: JobPointsProps) => (
  <JobPointsStyle {...rest}>
    {children}
  </JobPointsStyle>
);

export default JobPoints;
