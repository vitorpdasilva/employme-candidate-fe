import { styled, Box } from '@mui/material'

const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  color: 'inherit',
  textDecoration: 'none',
  border: `1px solid ${theme.palette.info.main}`,
  borderRadius: 10,
  transition: 'color 0.15s ease, border-color 0.15s ease',
  width: '100%',
  cursor: 'pointer',
  marginBottom: theme.spacing(2.5),
  background: theme.palette.common.white,
  '&:hover, &:focus, &:active': {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}))

export default StyledCard
