import { Box, Button, Link, styled, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { useIsAuthenticated } from '~/hooks'
import { useOnSignUp, SignUpInput } from '../../src/queries/onSignUp.mutation'

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

const resolver: Resolver<SignUpInput> = async (values) => {
  return {
    values: values.email && values.name && values.password ? values : {},
    errors: !values.email ? { email: { type: 'required', message: 'email is required' } } : {},
  }
}

const SignUp = (): JSX.Element => {
  const { onCall, loading } = useOnSignUp()
  const { register, handleSubmit } = useForm<SignUpInput>({ resolver })
  const isAuthenticated = useIsAuthenticated()

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [])

  const onSubmit = handleSubmit(async ({ email, password, name }) => {
    onCall({ email, password, name })
  })

  return (
    <FormWrapper component="form" onSubmit={onSubmit}>
      <TextField {...register('name')} label="Your Name" variant="outlined" />
      <TextField sx={{ my: 2 }} {...register('email')} label="email" variant="outlined" />
      <TextField {...register('password')} type="password" label="password" variant="outlined" />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {loading ? 'Signing up...' : 'Sign up'}
      </Button>
      <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
        Already have an account? <Link href="/login">Sign in</Link>
      </Typography>
    </FormWrapper>
  )
}

export default SignUp
