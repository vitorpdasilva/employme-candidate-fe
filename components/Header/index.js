import Link from 'next/link';
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa';
import StyledHeader from './style';
import Logo from '../Logo/index';

const headerItems = [
  {
    href: '/jobs',
    text: 'Find a job',
  },
  {
    href: '/my-jobs',
    text: 'My jobs',
  }
]

const Header = () => {
  const router = useRouter();

  return (
    <StyledHeader>
      <section>
        <Logo />
        <ul>
          {headerItems.map(({ href, text }) => (
            <li key={href} className={router.pathname === href ? 'active' : undefined}><Link href={href}><a>{text}</a></Link></li>
          ))}
        </ul>
        <FaUserCircle style={{ fontSize: 24, marginLeft: 'auto' }} />
      </section>
    </StyledHeader>
  );
};

export default Header;