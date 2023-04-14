import { Link } from "@mui/material"
import { useRouter } from "next/router"
import { FaUserCircle } from "react-icons/fa"
import { Dropdown } from "semantic-ui-react"
import { Logo } from "../Logo/index"
import StyledHeader, { StyledDropdown } from "./style"

type HeaderItemsProps = {
  href: string
  text: string
}
const headerItems: HeaderItemsProps[] = [
  { href: "/jobs", text: "Find a job" },
  { href: "/my-jobs", text: "My jobs" },
]

export const Header = () => {
  const router = useRouter()

  return (
    <StyledHeader>
      <div>
        <Link sx={{ textDecoration: "none" }} href="/">
          <Logo />
        </Link>
        <ul>
          {headerItems.map(({ href, text }) => (
            <li key={href} className={router.pathname === href ? "active" : undefined}>
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
        <StyledDropdown
          floating
          direction="left"
          icon={<FaUserCircle style={{ fontSize: 24, marginLeft: "auto" }} />}
        >
          <Dropdown.Menu>
            <Dropdown.Header>
              <FaUserCircle style={{ fontSize: 24, marginLeft: "auto" }} /> Vitor Boccio
            </Dropdown.Header>
            <Dropdown.Item>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </StyledDropdown>
      </div>
    </StyledHeader>
  )
}
