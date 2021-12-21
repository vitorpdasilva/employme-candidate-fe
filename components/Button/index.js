import ButtonStyle from './style';

const Button = ({ children, ...rest }) => <ButtonStyle {...rest}>{children}</ButtonStyle>;

export default Button;