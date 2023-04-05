import { ReactNode } from "react"
import { ButtonProps } from "semantic-ui-react"
import { ButtonStyle } from "./style"
// todo: delete this component and use MUI Button
type ButtonTypes = {
  children: ReactNode
  block?: boolean
  disabled?: boolean
  onClick?: () => unknown
} & ButtonProps

const Button = ({ children, ...rest }: ButtonTypes) => (
  <ButtonStyle {...rest}>{children}</ButtonStyle>
)

export default Button
