import "../styles/globals.css";
import { ElementType, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { theme } from '../styles/theme'
import { ThemeProvider } from "styled-components";
import Header from "../src/components/Header";
import "semantic-ui-css/semantic.min.css";
import { useUserAuth } from 'src/hooks'
import { AppContext, AppContextProvider } from "src/context";
import { Box, styled } from '@mui/material'

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
  const { isAuthenticated } = useUserAuth()
  const { userData } = useContext(AppContext);
  const router = useRouter()
  useEffect(() => {
    const test = window.localStorage.getItem('token')
    console.log({ test })
    if(test) {
      if(routesToBeRedirected.includes(router.pathname)) {
        router.push('/')
      }
    } 
    if (!test && !routesToBeRedirected.includes(router.pathname)) {
      router.push('/auth/login')
    }
  }, [])
  
  return (
    <>
      <ThemeProvider theme={theme}>
      <AppContextProvider>
        {/* {test && <Header />} */}
        <MainContentWrapper>
          <Component {...pageProps} />
        </MainContentWrapper>
        <Box>footer</Box>
      </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
