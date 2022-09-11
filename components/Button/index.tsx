import { ReactNode } from 'react'
import { ButtonStyle } from "./style";
import { ButtonProps } from 'semantic-ui-react'

type ButtonTypes = {
  children: ReactNode,
  block?: boolean
  disabled: boolean,
  onClick?: () => unknown
} & ButtonProps

const Button = ({ children, ...rest }: ButtonTypes) => <ButtonStyle {...rest}>{children}</ButtonStyle>;

export default Button;