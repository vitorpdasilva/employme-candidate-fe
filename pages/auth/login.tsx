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
import { ErrorResponse, useFetchApi } from 'client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { useIsAuthenticated } from '~/hooks'
import { authStore, userStore } from '~/stores'

type Credentials = {
  username: string
  password: string
}

const resolver: Resolver<Credentials> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
        username: { type: 'required', message: 'Username is required' },
      }
      : {},
  }
}

const Login = () => {
  const { fetchApi } = useFetchApi()
  const { register, handleSubmit } = useForm<Credentials>({ resolver })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const setUser = userStore((state: any) => state.setUser)
  const setTokens = authStore((state: any) => state.setTokens)
  const { isAuthenticated } = useIsAuthenticated()
  const [number, setNumber] = useState(0)

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
      const { userData, tokens } = await fetchApi({ url: '/auth/login', body })
      if (!userData || !tokens) throw new Error('Something went wrong')

      setUser(userData)
      setTokens(tokens)
      router.push('/')
    } catch (error: any) {
      setErrorMessage(error?.message as ErrorResponse['message'])
    }
  })

  return (
    <Grid container component="main" sx={{ height: '100vh', width: '100vw', position: 'absolute', left: 0, top: 0 }}>
      <button onClick={() => setNumber(number + 1)}>aidsjasid</button>
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
              {...register('username')}
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
                <Link href="/auth/signup" variant="body2">
                  {'Don\'t have an account? Sign Up'}
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
