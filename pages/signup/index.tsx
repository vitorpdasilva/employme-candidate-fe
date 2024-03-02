import { Alert, Box, Button, Link, styled, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { ErrorResponse } from 'client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { useIsAuthenticated } from '~/hooks'
import { signup as onSignUp } from './signup.query'
import { authStore, userStore } from '~/stores'
import { components } from '~/types'

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
    values: values.email && values.name && values.password ? values : {},
    errors: !values.email ? { email: { type: 'required', message: 'email is required' } } : {},
  }
}

const SignUp = (): JSX.Element => {
  const { register, handleSubmit } = useForm<Credentials>({ resolver })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isAuthenticated = useIsAuthenticated()
  const setUser = userStore((state) => state.setUser)
  const setTokens = authStore((state) => state.setTokens)

  const { isPending, mutate } = useMutation({
    mutationFn: onSignUp,
    mutationKey: ['/auth/signup'],
    onSuccess: (success: components['schemas']['UserWithTokensOutputDto']) => {
      console.log({ success })

      if (!success?.userData) return
      setUser(success.userData)
      setTokens(success.tokens)
      router.push('/')
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [])

  const onSubmit = handleSubmit(async ({ email, password, name }) => {
    setErrorMessage(null)

    try {
      mutate({ email, password, name })
      // eslint-disable-next-line
    } catch (error: any) {
      setErrorMessage(error?.message as ErrorResponse['message'])
    }
  })

  return (
    <FormWrapper component="form" onSubmit={onSubmit} onChange={(): void => setErrorMessage(null)}>
      {errorMessage && (
        <Alert sx={{ my: 2 }} severity="error">
          {errorMessage}
        </Alert>
      )}
      <TextField {...register('name')} label="Your Name" variant="outlined" />
      <TextField sx={{ my: 2 }} {...register('email')} label="email" variant="outlined" />
      <TextField {...register('password')} type="password" label="password" variant="outlined" />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {isPending ? 'Signing up...' : 'Sign up'}
      </Button>
      <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
        Already have an account? <Link href="/login">Sign in</Link>
      </Typography>
    </FormWrapper>
  )
}

export default SignUp
