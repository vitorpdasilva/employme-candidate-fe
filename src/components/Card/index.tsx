import Link from "next/link";
import StyledCard from "./style";
import { ReactNode } from 'react'

type CardProps = {
  href: string
  children: ReactNode
}

const Card = ({ href, children }: CardProps) => {
  return (
    <Link href={href}>
      <StyledCard>
        {children}
      </StyledCard>
    </Link>
  );
};

export default Card;