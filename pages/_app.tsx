import { Box, styled } from "@mui/material"
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline"
import Grid from "@mui/material/Unstable_Grid2"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { SnackbarProvider } from "notistack"
import { ElementType, useEffect } from "react"
import { Header, NavSidebar } from "src/components"
import { AppContextProvider } from "src/context"
import { useAuthStore } from "stores/auth"
import { ThemeProvider } from "styled-components"
import "../styles/globals.css"
import { theme } from "../styles/theme"
const routesToBeRedirected = ["/auth/login", "/auth/signup"]

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

const SharedButton = dynamic(async () => await import("main/button")) //eslint-disable-line
const sharedData = dynamic(async () => await import("main/data")) //eslint-disable-line

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter()
  const isAuth = useAuthStore((state: any) => !!state.user)
  console.log({ app: "_app", sharedData })
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
      <ScopedCssBaseline sx={{ height: "inherit", display: "flex", flexDirection: "column" }}>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isAuth && <Header />}
              <SnackbarProvider maxSnack={3} autoHideDuration={2000} preventDuplicate>
                <MainContentWrapper>
                  <SharedButton />
                  <Box sx={{ flexGrow: 1, width: "100%" }}>
                    <Grid container spacing={6} sx={{ pt: 6 }}>
                      <Grid md={2} xs={12}>
                        {isAuth && <NavSidebar />}
                      </Grid>
                      <Grid md={10} xs={12}>
                        <Component {...pageProps} />
                      </Grid>
                    </Grid>
                  </Box>
                </MainContentWrapper>
              </SnackbarProvider>
            </LocalizationProvider>
          </AppContextProvider>
        </ThemeProvider>
      </ScopedCssBaseline>
    </>
  )
}

export default MyApp
