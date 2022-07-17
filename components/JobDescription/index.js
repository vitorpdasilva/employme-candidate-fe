import StyledJobDescription from "./style";

const JobDescription = ({ children }) => {
  return (
    <StyledJobDescription>
      {children}
      <div className="fadeIn" />
    </StyledJobDescription>
  );
};

export default JobDescription;
