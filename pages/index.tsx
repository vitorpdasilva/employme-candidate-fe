import Head from 'next/head'
import { ProfileOverview } from 'src/components'

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>Employ Me Overseas (EMO) - Home</title>
      <meta name="description" content="Employ Me Overseas (EMO) - Home" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ProfileOverview />
  </>
)

export default Home
