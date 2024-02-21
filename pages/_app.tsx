import { Box, Container, NoSsr } from '@mui/material'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import Grid from '@mui/material/Unstable_Grid2'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'
import { ElementType, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { Header, NavSidebar } from '~/components'
import { useIsAuthenticated } from '~/hooks'
import '../styles/globals.css'
import { theme } from '../styles/theme'
const routesToBeRedirected = ['/auth/login', '/auth/signup']

type MyAppProps = {
  Component: ElementType
  pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  const router = useRouter()

  const { isAuthenticated } = useIsAuthenticated()
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
    <>
      <ScopedCssBaseline sx={{ height: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <NoSsr>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isAuthenticated && <Header />}
              <SnackbarProvider maxSnack={3} autoHideDuration={2000} preventDuplicate>
                <Container>
                  <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <Grid container spacing={6} sx={{ pt: 6 }}>
                      <Grid md={2} xs={12}>
                        {isAuthenticated && <NavSidebar />}
                      </Grid>
                      <Grid md={10} xs={12}>
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
    </>
  )
}

export default MyApp
