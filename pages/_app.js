import "../styles/globals.css";
import Header from "../components/Header";
import "semantic-ui-css/semantic.min.css";
import { AppContextProvider } from "./context";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
