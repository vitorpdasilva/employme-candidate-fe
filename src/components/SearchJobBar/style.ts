import styled from 'styled-components'

const SearchJobBarStyled = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 15px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 21px 0px;
  form {
    display: flex;
    align-items: center;
    article {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      div {
        width: 100%;
        &:not(:last-of-type) {
          margin-right: 20px;
        }
        p {
          margin: 0;
        }
        input,
        select {
          height: 50px;
          border: 0;
          width: 100%;
          max-width: 300px;
          &:focus {
            border: 0;
            outline: none;
          }
        }
      }
    }
    button {
      background: transparent;
      border: 0;
      cursor: pointer;
    }
  }
`

export default SearchJobBarStyled
