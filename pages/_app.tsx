import "../styles/globals.css";
import { ElementType } from 'react'
import { theme } from '../styles/theme'
import { ThemeProvider } from "styled-components";
import Header from "../components/Header";
import "semantic-ui-css/semantic.min.css";
import { AppContextProvider } from "./context";

type MyAppProps = {
  Component: ElementType
  pageProps: any
}
function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Header />
        <div style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1280,
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          padding: "0 20px",
        }}>
          <Component {...pageProps} />
        </div>
        <footer>footer</footer>
      </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
