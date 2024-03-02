import Head from 'next/head'
import { JobList, SearchJobBar } from 'src/components'
import { jobListQuery } from './jobs.query'
import { useQuery } from '@tanstack/react-query'

const Dashboard = (): JSX.Element => {
  const { data, isLoading } = useQuery({ queryKey: ['/job/list'], queryFn: jobListQuery })

  console.log({ data })
  if (isLoading) return <>Loading...</>

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
          <JobList jobList={data ?? []} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
