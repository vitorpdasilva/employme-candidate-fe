import styled from "styled-components";

const sizeLevel = {
  default: "32px",
  1: "32px",
  2: "28px",
  3: "24px",
  4: "20px",
  5: "16px",
};

const StyledTitle = styled.h1`
  font-size: ${({ level }) => sizeLevel[level] || sizeLevel.default};
`;

export default StyledTitle;