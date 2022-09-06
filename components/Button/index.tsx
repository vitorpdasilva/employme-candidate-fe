import { ReactNode } from 'react'
import { ButtonStyle } from "./style";

type ButtonProps = {
  children: ReactNode,
  block?: boolean
  onClick?: () => unknown
}

const Button = ({ children, ...rest }: ButtonProps) => <ButtonStyle {...rest}>{children}</ButtonStyle>;

export default Button;