import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0E3342',
      contrastText: '#DDDEDB',
    },
    secondary: {
      main: '#244C6B',
      contrastText: '#fff',
    },
    info: {
      main: '#94BCB1',
      contrastText: '#000',
    },
    error: {
      main: '#ed294c',
      contrastText: '#fff',
    },
    text: {
      primary: '#2D3437 ',
      secondary: '#30505B',
    },
  },
})
