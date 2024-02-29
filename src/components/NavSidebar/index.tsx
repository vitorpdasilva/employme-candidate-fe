import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
// import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Box, Link, styled, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
type MenuItems = Record<string, string | ReactNode>

const MenuItem = styled(Link)<{ selected: boolean }>(({ theme, selected }) => ({
  textDecoration: 'none',
  padding: 0,
  height: theme.spacing(8),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? theme.palette.primary.contrastText : theme.palette.common.black,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}))

const menuItems: MenuItems[] = [
  { name: 'Home', icon: <HomeOutlinedIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} />, href: '/' },
  { name: 'Profile', icon: <Face5OutlinedIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} />, href: '/profile' },
  {
    name: 'Jobs',
    icon: <BusinessCenterOutlinedIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} />,
    href: '/jobs',
  },
  // {
  //   name: 'Applied',
  //   icon: <DoneAllOutlinedIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} />,
  //   href: '/my-jobs',
  // },
  {
    name: 'Discover',
    icon: <ExploreOutlinedIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} />,
    href: '/discover',
  },
]

export const NavSidebar: FC = () => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <Grid
      container
      sx={{
        boxShadow: { xs: theme.shadows['5'], md: 'none' },
        background: 'white',
      }}
      direction={{ xs: 'row', md: 'column' }}
      spacing={2}
      p={0}
    >
      {menuItems.map((item) => (
        <Grid xs={3} md={12} key={item.href as string} p={0}>
          <MenuItem selected={item.href === router.pathname} href={item.href as string}>
            <Box>{item.icon}</Box>
            {item.name}
          </MenuItem>
        </Grid>
      ))}
    </Grid>
  )
}
