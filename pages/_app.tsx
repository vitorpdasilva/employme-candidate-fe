import "../styles/globals.css";
import { ElementType, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { theme } from '../styles/theme'
import { ThemeProvider } from "styled-components";
import "semantic-ui-css/semantic.min.css";
import { AppContextProvider } from "src/context";
import { Box, styled } from '@mui/material'
import { Header } from 'src/components'
import { useAuthStore } from "stores";

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
          <Component {...pageProps} />
        </MainContentWrapper>
        {isAuth && <Box>Footer</Box>}
      </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
