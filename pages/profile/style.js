import styled from 'styled-components';
import { colors } from '../../styles/theme';

const ProfileSectionWrapper = styled.section`
  width: 100%;
  max-width: 750px;
  border: 1px solid ${colors.gray.default};
  border-radius: 5px;
  background: ${colors.white.default};
  margin: 30px 0;
  padding: 20px;
  ul {
    list-style: none;
    padding: 0;
    column-count: 2;
    li {
      select, input {
        height: 50px;
        width: 100%;
        border: 1px solid ${colors.gray.default};
        border-radius: 5px;
        &:focus {
          outline: none;
        }
      }
      &:nth-child(odd) {
        margin-bottom: 20px;
      }
    }
  }
`;

export {
  ProfileSectionWrapper
}