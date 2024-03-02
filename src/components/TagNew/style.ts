import { styled, Box } from '@mui/material'

const Tag = styled(Box)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(3),
  borderRadius: theme.spacing(8),
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: ' center',
  alignItems: 'center',
}))

export default Tag
