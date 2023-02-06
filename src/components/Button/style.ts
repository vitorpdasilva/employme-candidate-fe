import styled from "styled-components";
import { Button } from 'semantic-ui-react'

export const ButtonStyle = styled(Button)<{block?: boolean, height?: string}>`
  background: ${props => props.theme.colors.blue.default};
  color: ${props => props.theme.colors.white.default};
  border: 0;
  padding: 10px 25px;
  width: ${({ block }) => block ? "100%" : "auto"};
  height: ${({ height }) => height || "auto"};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background: ${props => props.theme.colors.blue.hover};
  }
`;