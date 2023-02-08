import StyledJobDescription from "./style";
import { ReactNode } from 'react'

type JobDescriptionProps = {
  children: ReactNode
}

const JobDescription = ({ children }: JobDescriptionProps) => {
  return (
    <StyledJobDescription>
      {children}
      <div className="fadeIn" />
    </StyledJobDescription>
  );
};

export default JobDescription;
