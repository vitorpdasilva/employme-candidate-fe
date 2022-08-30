import styled from "styled-components";

const JobCardMain = styled.div`
  flex-grow: 1;
  h1 {
    font-size: 34px;
    margin: 0;
  }
`;

const HeadLine = styled.div`
  display: flex;
  align-items: center;
  small {
    margin-left: 10px;
  }
`;

const JobPageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  margin: 30px auto;
  justify-content: space-between;
  padding: 0 20px;
  > div {
    max-width: 750px;
    min-width: 250px;
  }
`;

export { JobCardMain, HeadLine, JobPageWrapper };