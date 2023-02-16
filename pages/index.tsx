import Head from 'next/head'
import { FC } from 'react'
import { ProfileOverview } from 'src/components'
import React from 'react'

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Employ Me Overseas (EMO) - Home Page</title>
        <meta
          name="description"
          content="Employ Me Overseas (EMO) - Home Page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileOverview />
    </>
  )
}

export default Home
