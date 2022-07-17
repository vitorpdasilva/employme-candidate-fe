import styled from "styled-components";
import { colors } from "../../styles/theme";

const ProfileSectionWrapper = styled.section`
  width: 100%;
  max-width: 750px;
  border: 1px solid ${colors.gray.default};
  border-radius: 5px;
  background: ${colors.white.default};
  margin: 30px 0;
  padding: 20px;
  &:hover {
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 21px 0px;
  }
  ul {
    list-style: none;
    padding: 0;
    column-count: 2;
  }
  select, input {
    height: 50px;
    width: 100%;
    border: 1px solid ${colors.gray.default};
    border-radius: 5px;
    &:focus {
      outline: none;
    }
    &:nth-of-type(odd) {
      margin-bottom: 20px;
    }
  }
  article {
    display: flex;
    flex-wrap: wrap;
    section {
      width: 100%;
      column-count: 2;
    }
  }
`;

export {
  ProfileSectionWrapper
};