import { Box, styled } from '@mui/material'

const StyledJobDescription = styled(Box)(({ theme }) => ({
  maxHeight: '200px',
  position: 'relative',
  overflow: 'hidden',
  '.fadeIn': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing(4, 0),
    height: theme.spacing(5),
    backgroundImage: 'linear-gradient(to bottom, transparent, white)',
  },
}))

export default StyledJobDescription
