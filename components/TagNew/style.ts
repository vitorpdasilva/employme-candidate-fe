import styled from "styled-components";
// import { colors } from "../../styles/theme";

const Tag = styled.div`
    width: 65px;
    height: 25px;
    border-radius: 65px;
    background: ${props => props.theme.colors.blue.default};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Tag;