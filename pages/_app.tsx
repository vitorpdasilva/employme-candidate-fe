import "../styles/globals.css";
import { ElementType, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { theme } from '../styles/theme'
import { ThemeProvider } from "styled-components";
import "semantic-ui-css/semantic.min.css";
import { AppContextProvider } from "src/context";
import { Box, styled } from '@mui/material'
import { Header, NavSidebar } from 'src/components'
import { useAuthStore } from "stores";
import Grid from '@mui/material/Unstable_Grid2'

const routesToBeRedirected = ['/auth/login', '/auth/signup']

type MyAppProps = {
  Component: ElementType
  pageProps: any
}

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  width: "100%",
  maxWidth: 1280,
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  padding: "0 20px",
})


function MyApp({ Component, pageProps } : MyAppProps) {
  const router = useRouter()
  const isAuth = useAuthStore((state: any) => !!state.user);
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      if(routesToBeRedirected.includes(router.pathname)) {
        router.push('/')
      }
    } 
    if (!token && !routesToBeRedirected.includes(router.pathname)) {
      router.push('/auth/login')
    }
  }, [])
  
  return (
    <>
      <ThemeProvider theme={theme}>
      <AppContextProvider>
        {isAuth && <Header />}
        <MainContentWrapper>
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Grid container >
              <Grid xs={2}>
                <NavSidebar />
              </Grid>
              <Grid xs={10}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          </Box>
        </MainContentWrapper>
        {isAuth && <Box>Footer</Box>}
      </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
