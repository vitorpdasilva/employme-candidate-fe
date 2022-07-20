import styled from 'styled-components'

export const StyledLogo = styled.div`
  border: ${props => `1px solid ${props.theme.colors.blue.default}`};
  width: 45;
  height: 45;
  /* background: colors.blue.default,
  borderRadius: 5,
  color: colors.white.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center", */
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