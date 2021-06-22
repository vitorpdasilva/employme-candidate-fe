import Link from 'next/link';
import StyledCard from './style';

const Card = ({ href, children }) => {
  return (
    <Link href={href}>
      <StyledCard>
        {children}
      </StyledCard>
    </Link>
  );
}

export default Card;