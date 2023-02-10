import StyledJobDescription from "./style";
import { ReactNode } from 'react'

type JobDescriptionProps = {
  children: ReactNode
}

export const JobDescription = ({ children }: JobDescriptionProps) => {
  return (
    <StyledJobDescription>
      {children}
      <div className="fadeIn" />
    </StyledJobDescription>
  );
};