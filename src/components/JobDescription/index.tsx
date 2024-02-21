import { ReactNode } from 'react'
import StyledJobDescription from './style'

type JobDescriptionProps = {
  children: ReactNode
}

export const JobDescription = ({ children }: JobDescriptionProps): JSX.Element => {
  return (
    <StyledJobDescription>
      {children}
      <div className="fadeIn" />
    </StyledJobDescription>
  )
}
