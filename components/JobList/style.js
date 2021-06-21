import styled from 'styled-components';

const JobListGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
  ul {
    list-style:none;
    padding: 0;
    margin: 0;
  }
`;

export default JobListGrid;