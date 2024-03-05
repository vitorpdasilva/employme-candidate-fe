import { Box, styled } from '@mui/material'

export const JobCardMain = styled(Box)({
  flexGrow: 1,
  h1: {
    fontSize: '34px',
    margin: 0,
  },
})

export const HeadLine = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  small: {
    marginLeft: theme.spacing(1.25),
  },
}))

export const JobPageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  margin: '30px auto',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2.5),
  '> div': {
    maxWidth: '750px',
    minWidth: '250px',
  },
}))
