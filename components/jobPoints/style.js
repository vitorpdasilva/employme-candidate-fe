import styled from 'styled-components';
import { colors } from '../../styles/theme';

const JobPointsStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 20px 0;
  padding: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.gray.default};
  font-size: 15px;
`;

export default JobPointsStyle;