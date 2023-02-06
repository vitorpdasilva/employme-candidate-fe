import Link from "next/link";
import { Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import StyledHeader, { StyledDropdown } from "./style";
import Logo from "../Logo/index";

type HeaderItemsProps = {
  href: string
  text: string
}
const headerItems: HeaderItemsProps[] = [
  { href: "/jobs", text: "Find a job" },
  { href: "/my-jobs", text: "My jobs" },
];

const Header = () => {
  const router = useRouter();

  return (
    <StyledHeader>
      <section>
        <Logo />
        <ul>
          {headerItems.map(({ href, text }) => (
            <li key={href} className={router.pathname === href ? "active" : undefined}><Link href={href}><a>{text}</a></Link></li>
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
              <Link href="/profile"><a>Profile</a></Link>
            </Dropdown.Item>
            <Dropdown.Item>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </StyledDropdown>
      </section>
    </StyledHeader>
  );
};

export default Header;