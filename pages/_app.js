import '../styles/globals.css'
import Header from '../components/Header';
import styles from '../styles/layout.module.css';
import 'semantic-ui-css/semantic.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <footer>footer</footer>
    </>
  )
}

export default MyApp
