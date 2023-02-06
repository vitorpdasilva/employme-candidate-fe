import "../styles/globals.css";
import { ElementType } from 'react'
import { theme } from '../styles/theme'
import { ThemeProvider } from "styled-components";
import Header from "../src/components/Header";
import "semantic-ui-css/semantic.min.css";
import { AppContextProvider } from "./context";
import { Box, styled } from '@mui/material'
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

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Header />
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
