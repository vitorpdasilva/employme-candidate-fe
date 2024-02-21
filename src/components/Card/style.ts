import styled from 'styled-components'
// import { colors } from "../../styles/theme";

const StyledCard = styled.div`
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.colors.gray.default};
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;
  background: ${(props) => props.theme.colors.white.default};
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.blue.default};
    border-color: ${(props) => props.theme.colors.blue.default};
  }
`

export default StyledCard
