import { fetchApi } from "../client";
import { useAuthStore } from "stores";
import { Form } from 'semantic-ui-react'
import { Box, TextField, Button, styled } from '@mui/material'

// email: 'vitorboccio@gmail.com',
// password: 'vitor123',

const FormWrapper = styled(Box)({
  border: '1px solid #c5c5c5', 
  display: 'flex', 
  flexDirection: 'column', 
  padding: '3em',
  borderRadius: '10px', 
  justifyContent: 'space-around',
  background: '#f3f3f3',
  '& input': {
    background: '#fff',
  }
})

const Login = () => {
  const setUserToStore = useAuthStore((state: any) => state.setUser);

  const body = {
    
  }

  const submitLogin = async () => {
    const { user } = await fetchApi({ url: "/login", body });
    setUserToStore(user)
  };

  return (
    <FormWrapper component="form">
      <TextField label="username" variant="outlined" />
      <TextField type="password" sx={{ my: 2 }} label="password" variant="outlined" />
      <Button variant="contained" onClick={submitLogin}>Login</Button>
    </FormWrapper>
  );
};

export default Login;
