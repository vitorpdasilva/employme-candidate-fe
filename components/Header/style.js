import styled from 'styled-components';
import { colors } from '../../styles/theme';

const StyledHeader = styled.header`
  height: 60px;
  border-bottom: 1px solid ${colors.gray.default};
  padding: 0 20px;
  display: flex;
  justify-content: center;
  section {
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 1280px;
    padding: 0 20px;
    ul {
      list-style: none;
      display: flex;
      height: 100%;
      li:not(:last-of-type) {
        margin-right: 25px;
      }
      li {
        cursor: pointer;
        height: 100%;
        position: relative;
        a {
          float: left;
          height: 100%;
          display: flex;
          align-items: center;  
        }
      }
      li:hover, li.active {
        &:after {
          width: 100%;
          height: 4px;
          background: ${colors.blue.default};
          position: absolute;
          bottom: 0;
          left: 0;
          content: "";
        }
        border-color: ${colors.blue.default}
      }
    }
  }
`;

export default StyledHeader;