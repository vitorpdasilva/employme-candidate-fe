import { styled } from '@mui/material'

const SearchJobBarStyled = styled('div')({
  width: '100%',
  margin: '15px 0',
  padding: '15px',
  borderRadius: '10px',
  boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 21px 0px',
  form: {
    display: 'flex',
    alignItems: 'center',
    article: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-between',
      div: {
        width: '100%',
        '&:not(:last-of-type)': {
          marginRight: '20px',
        },
        p: {
          margin: 0,
        },
        'input, select': {
          height: '50px',
          border: 0,
          width: '100%',
          maxWidth: '300px',
          '&:focus': {
            border: 0,
            outline: 'none',
          },
        },
      },
    },
    button: {
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
    },
  },
})

export default SearchJobBarStyled
