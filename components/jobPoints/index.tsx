import JobPointsStyle from "./style";
import { ReactNode } from 'react'

type JobPointsProps = {
  children: ReactNode
}

const JobPoints = ({ children }: JobPointsProps) => (
  <JobPointsStyle>
    {children}
  </JobPointsStyle>
);

export default JobPoints;
