import { Box, styled } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router"
import { ElementType, useEffect } from "react"
import "semantic-ui-css/semantic.min.css"
import { Header, NavSidebar } from "src/components"
import { AppContextProvider } from "src/context"
import { useAuthStore } from "stores/auth"
import { ThemeProvider } from "styled-components"
import "../styles/globals.css"
import { theme } from "../styles/theme"

const routesToBeRedirected = ["/auth/login", "/auth/signup"]

type MyAppProps = {
  Component: ElementType;
  pageProps: any;
};

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
  const router = useRouter()
  const isAuth = useAuthStore((state: any) => !!state.user)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      if (routesToBeRedirected.includes(router.pathname)) {
        router.push("/")
      }
    }
    if (!token && !routesToBeRedirected.includes(router.pathname)) {
      router.push("/auth/login")
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          {isAuth && <Header />}
          <MainContentWrapper>
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid container spacing={6} sx={{ pt: 6 }}>
                <Grid xs={2}>{isAuth && <NavSidebar />}</Grid>
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
  )
}

export default MyApp
