import Head from 'next/head'
import { SearchJobBar } from 'src/components'
import { jobListQuery } from './jobs.query'
import { useQuery } from '@tanstack/react-query'
import { Container } from '@mui/material'
import { JobList } from './JobList'

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
      <Container>
        <SearchJobBar />
        <JobList jobList={data ?? []} />
      </Container>
    </>
  )
}

export default Dashboard
