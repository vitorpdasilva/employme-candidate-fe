import styled from "styled-components";

const ProfileSectionWrapper = styled.section`
  width: 100%;
  max-width: 750px;
  border: 1px solid ${props => props.theme.colors.gray.default};
  border-radius: 5px;
  background: ${props => props.theme.colors.white.default};
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
  article {
    display: flex;
    flex-wrap: wrap;
    section {
      width: 100%;
      column-count: 2;
    }
  }
`;

const InputRow = styled('div')<{labelWidth?: string}>`
  display: flex;
  align-items: center;
  margin: 16px 0;
  > div.input {
    width: 100%;
    .label {
      min-width: ${({ labelWidth }) => labelWidth ?? 'auto'};
    }
  }
`

export {
  InputRow,
  ProfileSectionWrapper
};