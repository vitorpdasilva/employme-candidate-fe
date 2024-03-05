import Link from 'next/link'
import { ReactNode } from 'react'
import StyledCard from './style'
import { Box } from '@mui/material'
type CardProps = {
  href: string
  children: ReactNode
}

export const Card = ({ href, children }: CardProps): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }} component={Link} href={href}>
      <StyledCard>{children}</StyledCard>
    </Box>
  )
}
