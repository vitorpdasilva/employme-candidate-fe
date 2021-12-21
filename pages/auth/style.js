import styled from 'styled-components';
import { colors } from '../../styles/theme';

const StyledFormHolder = styled.div`
  border: 1px solid ${colors.gray.default};
  background: ${colors.white.default};
  margin: 30px 0;
  padding: 20px;
  width: 100%;
  max-width: 750px;
  border-radius: 5px;
  
  &:hover {
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 21px 0px;
  }
  select, input {
    height: 50px;
    width: 100%;
    border: 1px solid ${colors.gray.default};
    border-radius: 5px;
    margin-bottom: 20px;
    &:focus {
      outline: none;
    }
    
  }
`;

export {
  StyledFormHolder,
}