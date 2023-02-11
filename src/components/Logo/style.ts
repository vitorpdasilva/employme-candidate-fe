import styled from 'styled-components'

export const StyledLogo = styled.div`
  border: ${props => `1px solid ${props.theme.colors.blue.default}`};
  width: 45px;
  height: 45px;
  background-color: ${props => props.theme.colors.blue.default};
  color: white;
  line-height: 45px;
  text-align: center;
  border-radius: 5px;
`

export const Button = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;