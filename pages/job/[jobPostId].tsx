import parse from 'html-react-parser'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Message, Popup } from 'semantic-ui-react'
// react-country-flag doesnt exist in @types npm-registry
// TODO: replace to a flag library that contain types
//@ts-ignore
import { JobCardHeadline } from '@/components/JobCardHeadline'
import { JobPoints } from '@/components/jobPoints'
import { countriesList } from '@/constants'
import { authStore } from '@/stores'

import { Button } from '@mui/material'
import { fetchApi } from 'client'
import { useRouter } from 'next/router'
import ReactCountryFlag from 'react-country-flag'
import { FaDollarSign, FaPlaneDeparture } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { JobCardMain, JobPageWrapper } from './style'

type JobInfoType = {
  id: number
  applicants: string[]
  recent: boolean
  createdAt: Date
  title: string
  location: {
    city: string
    country: string
    province: string
  }
  locationType: string
  description: string
  tags: string[]
  salary: {
    from: number
    to: number
    currency: string
    period: string
  }
}

const JobPostPage = () => {
  const router = useRouter()
  const [jobPostId, setJobPostId] = useState('')
  const [jobInfo, setJobInfo] = useState<JobInfoType | null>(null)
  const [applyJobStatus, setApplyJobStatus] = useState('')

  const user = authStore((state: any) => state.user)

  useEffect(() => {
    if (jobPostId) {
      const fetchData = async () => {
        const response = await fetchApi({ url: `/job/${jobPostId}` })
        setJobInfo(response)
      }
      fetchData()
    }
  }, [jobPostId])

  useEffect(() => {
    if (router?.query) {
      setJobPostId(router?.query?.jobPostId?.[0] ?? '')
    }
  }, [router])

  const applyToJob = async () => {
    if (user) {
      const body = {
        applicantId: user.id,
      }
      try {
        const { status, message } = await fetchApi({
          url: `/job/${jobPostId}/apply`,
          body,
        })
        toast(message, {
          position: 'top-right',
          autoClose: 5000,
          type: status,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } catch (err: any) {
        console.error(err.error)
      }
    } else {
      console.error('no user data')
    }
  }

  if (!jobInfo || !user) return <span>Loading...</span>

  const { title, location, locationType, salary, recent, id: jobId, description, createdAt } = jobInfo

  return (
    <>
      <Head>
        <title>Employ Me - {title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <JobPageWrapper>
        <JobCardMain>
          <JobCardHeadline recent={recent} createdAt={createdAt} />
          <h1>{title}</h1>
          <JobPoints style={{ display: 'flex', justifyContent: 'space-between' }}>
            <li>
              <ReactCountryFlag
                countryCode={countriesList?.find((country) => country?.name === location?.country)?.code ?? ''}
                aria-label={countriesList?.find((country) => country?.name === location?.country)?.code}
                svg
                style={{ marginRight: 10 }}
              />
              {location.city} - {location.country}
            </li>
            <li>
              <FaPlaneDeparture /> {locationType}
            </li>
            <li>
              <FaDollarSign /> ${salary.from} up to ${salary.to} {salary.currency}/{salary.period}
            </li>
          </JobPoints>
          {parse(description)}

          <Popup
            content={
              <Message negative>
                <Message.Header>Error</Message.Header>
                {applyJobStatus}
              </Message>
            }
            closeOnEscape
            closeOnPortalMouseLeave
            onClose={() => setApplyJobStatus('')}
            open={!!applyJobStatus}
            trigger={
              <Button variant="contained" disabled={user?.jobsApplied?.includes(jobId)} onClick={() => applyToJob()}>
                {user?.jobsApplied?.includes(jobId) ? 'Already applied for this position' : 'Apply for this position'}
              </Button>
            }
          />
        </JobCardMain>
      </JobPageWrapper>
      <ToastContainer />
    </>
  )
}

export default JobPostPage
