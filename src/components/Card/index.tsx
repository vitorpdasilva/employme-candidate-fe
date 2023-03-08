import Link from "next/link"
import { ReactNode } from "react"
import StyledCard from "./style"

type CardProps = {
  href: string;
  children: ReactNode;
};

const Card = ({ href, children }: CardProps) => {
  return (
    <Link href={href}>
      <StyledCard>{children}</StyledCard>
    </Link>
  )
}

export default Card
