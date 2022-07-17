import styled from "styled-components";
import { colors } from "../../styles/theme";

export const ButtonStyle = styled('button')<{block: boolean, height: 'string'}>`
  background: ${colors.blue.default};
  color: ${colors.white.default};
  border: 0;
  padding: 10px 25px;
  width: ${({ block }) => block ? "100%" : "auto"};
  height: ${({ height }) => height || "auto"};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background: ${colors.blue.hover};
  }
`;