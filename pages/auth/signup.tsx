import { Alert, Box, Button, Link, styled, TextField, Typography } from '@mui/material'
import { ErrorResponse, useFetchApi } from 'client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { useIsAuthenticated } from '~/hooks'
import { authStore } from '~/stores'

type Credentials = {
  email: string
  password: string
  name: string
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
  },
})

const resolver: Resolver<Credentials> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
        email: { type: 'required', message: 'email is required' },
      }
      : {},
  }
}

const SignUp = () => {
  const { fetchApi } = useFetchApi()
  const { register, handleSubmit } = useForm<Credentials>({ resolver })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { isAuthenticated } = useIsAuthenticated()
  const setUser = authStore((state: any) => state.setUser)
  const setTokens = authStore((state: any) => state.setTokens)

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage(null)
    const body = {
      email: data.email,
      password: data.password,
      name: data.name,
    }

    try {
      const { user, token } = await fetchApi({ url: '/register', body })
      setUser(user)
      setTokens(token)
      router.push('/')
    } catch (error: any) {
      setErrorMessage(error?.message as ErrorResponse['message'])
    }
  })

  return (
    <FormWrapper component="form" onSubmit={onSubmit} onChange={() => setErrorMessage(null)}>
      {errorMessage && (
        <Alert sx={{ my: 2 }} severity="error">
          {errorMessage}
        </Alert>
      )}
      <TextField {...register('name')} label="Your Name" variant="outlined" />
      <TextField sx={{ my: 2 }} {...register('email')} label="email" variant="outlined" />
      <TextField {...register('password')} type="password" label="password" variant="outlined" />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Sign Up
      </Button>
      <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
        Already have an account? <Link href="/auth/login">Sign in</Link>
      </Typography>
    </FormWrapper>
  )
}

export default SignUp
