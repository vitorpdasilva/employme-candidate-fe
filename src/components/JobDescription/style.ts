import styled from 'styled-components'

const StyledJobDescription = styled.div`
  max-height: 175px;
  position: relative;
  overflow: hidden;
  .fadeIn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 30px 0;
    height: 50px;
    background-image: linear-gradient(to bottom, transparent, white);
  }
`

export default StyledJobDescription
