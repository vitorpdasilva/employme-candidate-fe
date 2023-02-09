import { useRouter } from "next/router";
import { fetchApi, ErrorResponse } from "../client";
import { useAuthStore, AuthStoreType } from "stores";
import { Box, TextField, Button, styled, Alert, Typography, Link } from '@mui/material'
import { useForm, Resolver } from 'react-hook-form'
import { useEffect, useState } from "react";
import { useUserAuth } from "src/hooks";

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
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Credentials>({ resolver })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const setUserToStore = useAuthStore((state: any) => state.setUser);
  const { isAuthenticated } = useUserAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage(null)
    const body = {
      email: data.username,
      password: data.password,
    }
    
    try {
      const { user, token } = await fetchApi({ url: "/login", body });
      setUserToStore(user, token)
      router.push('/')
    } catch (error: any) { 
      setErrorMessage(error?.message as ErrorResponse['message'])
    }
    
  })

  return (
    <FormWrapper component="form" onSubmit={onSubmit} onChange={() => setErrorMessage(null)}>
      {errorMessage && <Alert sx={{ my: 2 }} severity="error">{errorMessage}</Alert>}
      <TextField {...register('username')} label="username" variant="outlined" />
      <TextField {...register('password')} type="password" sx={{ my: 2 }} label="password" variant="outlined" />
      <Button type="submit" variant="contained">Login</Button>
      <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
        Don't have an account? <Link href="/auth/signup">Sign up</Link>
      </Typography>
    </FormWrapper>
  );
};

export default Login;
