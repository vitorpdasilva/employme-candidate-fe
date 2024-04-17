import { Container, NoSsr, ScopedCssBaseline, ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'
import { ElementType, useEffect } from 'react'
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
      <ScopedCssBaseline>
        <NoSsr>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isAuthenticated && <Header />}
              <SnackbarProvider maxSnack={3} autoHideDuration={2000} preventDuplicate>
                <Container sx={{ minHeight: '100vh', border: '1px solid green', height: 'auto', mt: 2 }}>
                  <Grid
                    container
                    spacing={6}
                    sx={{ mt: 3, height: '100%', position: 'relative' }}
                    direction={{ xs: 'column-reverse', md: 'row' }}
                  >
                    <Grid
                      md={2}
                      xs={12}
                      sx={{
                        p: { xs: 1, md: 3 },
                        position: { xs: 'fixed', md: 'sticky' },
                        bottom: 0,
                        zIndex: 1,
                        alignItems: { md: 'center' },
                      }}
                    >
                      {isAuthenticated && <NavSidebar />}
                    </Grid>
                    <Grid md={10} xs={12} sx={{ mb: 'auto', position: 'absolute', right: 0, top: 0, zIndex: 0 }}>
                      <Component {...pageProps} />
                    </Grid>
                  </Grid>
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
