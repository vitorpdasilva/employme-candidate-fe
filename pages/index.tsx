import Head from "next/head"
import { FC } from "react"
import { ProfileOverview } from "src/components"

const Home: FC = () => (
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
