import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import { Box, Link, styled } from "@mui/material"
import { useRouter } from "next/router"
import { FC, ReactNode } from "react"

type MenuItems = Record<string, string | ReactNode>;

const MenuItem = styled(Link)<{ selected: boolean }>(({ theme, selected }) => ({
  textDecoration: "none",
  height: 65,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  background: selected ? theme.palette.primary.contrastText : "transparent",
  color: selected ? theme.palette.primary.main : theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.primary.contrastText,
  },
}))

const menuItems: MenuItems[] = [
  { name: "Home", icon: <HomeOutlinedIcon fontSize="large" />, href: "/" },
  { name: "Profile", icon: <Face5OutlinedIcon />, href: "/profile" },
  {
    name: "Jobs",
    icon: <BusinessCenterOutlinedIcon fontSize="large" />,
    href: "/jobs",
  },
  {
    name: "Applied",
    icon: <DoneAllOutlinedIcon fontSize="large" />,
    href: "/my-jobs",
  },
  {
    name: "Discover",
    icon: <ExploreOutlinedIcon fontSize="large" />,
    href: "/discover",
  },
]

export const NavSidebar: FC = () => {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {menuItems.map((item) => (
        <MenuItem
          key={item.href as string}
          selected={item.href === router.pathname}
          href={item.href as string}
        >
          {item.icon}
          {item.name}
        </MenuItem>
      ))}
    </Box>
  )
}
