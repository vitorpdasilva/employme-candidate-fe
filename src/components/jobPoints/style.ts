import { styled } from '@mui/material'

const JobPointsStyle = styled('ul')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  listStyle: 'none',
  margin: theme.spacing(2.5, 0),
  padding: 0,
  paddingBottom: theme.spacing(2.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: '15px',
}))

export default JobPointsStyle
