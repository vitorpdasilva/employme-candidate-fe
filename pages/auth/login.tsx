import { fetchApi } from "../client";
import { useAuthStore } from "stores";
import { Box, TextField, Button, styled } from '@mui/material'
import { useForm, Resolver } from 'react-hook-form'

// email: 'vitorboccio@gmail.com',
// password: 'vitor123',

type Credentials = {
  username: string;
  password: string;
}

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

const resolver: Resolver<Credentials> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username ? { 
      username: { type: 'required', message: 'Username is required' } } 
      : {}
  }
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Credentials>({ resolver })
  const setUserToStore = useAuthStore((state: any) => state.setUser);
  // setUserToStore(user)
  
  const onSubmit = handleSubmit(async (data) => {
    const body = {
      email: data.username,
      password: data.password,
    }
    
    try {
      const { user } = await fetchApi({ url: "/login", body });
      console.log({ user })
    } catch (error: any) {
      console.log({ a: 'this error?', error: error.message })
    }
    
  })

  return (
    <FormWrapper component="form" onSubmit={onSubmit}>
      <TextField {...register('username')} label="username" variant="outlined" />
      <TextField {...register('password')} type="password" sx={{ my: 2 }} label="password" variant="outlined" />
      <Button type="submit" variant="contained">Login</Button>
    </FormWrapper>
  );
};

export default Login;
