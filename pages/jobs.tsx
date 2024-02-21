import { useFetchApi } from 'client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { JobList, SearchJobBar } from 'src/components'

const Dashboard = (): JSX.Element => {
  const { fetchApi } = useFetchApi()
  const [jobList, setJobList] = useState([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { jobs } = await fetchApi({ url: '/jobs', method: 'GET' })
      setJobList(jobs)
    }
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Employ Me Overseas (EMO) - Jobs</title>
        <meta name="description" content="Employ Me Overseas (EMO) - Jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: '100%' }}>
        <SearchJobBar />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 1280,
          }}
        >
          <JobList jobList={jobList} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
