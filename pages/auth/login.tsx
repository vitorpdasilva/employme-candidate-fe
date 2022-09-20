import { fetchApi } from "../client";
import { useAuthStore } from "stores";
import { Background } from './background'
import { Form } from 'semantic-ui-react'
import { Button } from 'components'
import { CustomForm } from './style'
const Login = () => {
  const setUserToStore = useAuthStore((state: any) => state.setUser);

  const body = {
    email: 'vitorboccio@gmail.com',
    password: 'vitor123',
  }

  const submitLogin = async () => {
    const { user } = await fetchApi({ url: "/login", body });
    setUserToStore(user)
  };

  return (
    <>
      <Background />
      <CustomForm>
        <Form.Input label='Email' placeholder='Email' />
        <Form.Input label='Password' placeholder='Password' />
        <Button onClick={submitLogin}>Login</Button>
      </CustomForm>
    </>
    
  );
};

export default Login;
