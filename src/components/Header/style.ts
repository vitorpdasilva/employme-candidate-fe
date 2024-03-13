import { Dropdown } from 'semantic-ui-react'
import { styled } from '@mui/material'

const StyledHeader = styled('div')({
  height: '60px',
  borderBottom: '1px solid gray', // todo: theme
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'center',
  div: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    maxWidth: '1280px',
    padding: '0 20px',
    ul: {
      listStyle: 'none',
      display: 'flex',
      height: '100%',
      marginRight: 'auto',
      'li:not(:last-of-type)': {
        marginRight: '25px',
      },
      li: {
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        a: {
          float: 'left',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        },
      },
      'li:hover, li.active': {
        a: {
          fontWeight: 600,
        },
        '&:after': {
          width: '100%',
          height: '4px',
          background: 'main', // todo: theme
          position: 'absolute',
          bottom: 0,
          left: 0,
          content: '',
        },
        borderColor: 'main', // todo: theme
      },
    },
  },
  a: {
    color: 'black',
  },
})

const StyledDropdown = styled(Dropdown)({
  '.menu': {
    '.header': {
      display: 'flex',
      alignItems: 'center',
      '> svg': {
        marginRight: '10px',
      },
    },
    '.item.item': {
      height: '36px',
      '> a': {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '15px',
      },
    },
  },
})

export { StyledDropdown }
export default StyledHeader
