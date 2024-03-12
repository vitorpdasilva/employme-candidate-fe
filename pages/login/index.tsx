import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { ErrorResponse } from 'client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { useIsAuthenticated } from '~/hooks'
import { authStore, userStore } from '~/stores'
import { useMutation } from '@tanstack/react-query'
import { onSignIn } from './onLogin.mutation'

type Credentials = {
  email: string
  password: string
}

const resolver: Resolver<Credentials> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email ? { email: { type: 'required', message: 'email is required' } } : {},
  }
}

const Login = (): JSX.Element => {
  const { register, handleSubmit } = useForm<Credentials>({ resolver })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const setUser = userStore((state) => state.setUser)
  const setTokens = authStore((state) => state.setTokens)
  const isAuthenticated = useIsAuthenticated()
  const { isPending, mutate } = useMutation({
    mutationFn: onSignIn,
    mutationKey: ['/auth/login'],
    onSuccess: (success) => {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      mutate(data)
    } catch (error) {
      const errorResponse = error as ErrorResponse
      setErrorMessage(errorResponse.message)
    }
  })

  if (isPending) return <div>Loading...</div>

  return (
    <Grid container component="main">
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            {errorMessage && (
              <Alert sx={{ my: 2 }} severity="error">
                {errorMessage}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register('email')}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              {...register('password')}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login
