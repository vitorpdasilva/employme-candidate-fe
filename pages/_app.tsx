import { Box, Container, NoSsr } from '@mui/material'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import Grid from '@mui/material/Unstable_Grid2'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'
import { ElementType, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { Header, NavSidebar } from '~/components'
import { useIsAuthenticated } from '~/hooks'
import '../styles/globals.css'
import { theme } from '../styles/theme'
const routesToBeRedirected = ['/login', '/signup']

type MyAppProps = {
  Component: ElementType
  // eslint-disable-next-line
  pageProps: any
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  const router = useRouter()

  const isAuthenticated = useIsAuthenticated()
  useEffect(() => {
    if (isAuthenticated) {
      if (routesToBeRedirected.includes(router.pathname)) {
        router.push('/')
      }
    }
    if (!isAuthenticated && !routesToBeRedirected.includes(router.pathname)) {
      router.push('/login')
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ScopedCssBaseline sx={{ height: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <NoSsr>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isAuthenticated && <Header />}
              <SnackbarProvider maxSnack={3} autoHideDuration={2000} preventDuplicate>
                <Container sx={{ height: '100%' }}>
                  <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
                    <Grid
                      container
                      spacing={6}
                      sx={{ mt: 3, height: '100%' }}
                      direction={{ xs: 'column-reverse', md: 'row' }}
                    >
                      <Grid md={2} xs={12}>
                        {isAuthenticated && <NavSidebar />}
                      </Grid>
                      <Grid md={10} xs={12} sx={{ mb: 'auto' }}>
                        <Component {...pageProps} />
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </NoSsr>
      </ScopedCssBaseline>
    </QueryClientProvider>
  )
}

export default MyApp
