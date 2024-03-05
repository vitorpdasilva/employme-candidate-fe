import parse from 'html-react-parser'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Message, Popup } from 'semantic-ui-react'
import { JobPoints, JobCardHeadline } from '~/components'
import { countriesList } from '~/constants'
import { userStore } from '~/stores'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import ReactCountryFlag from 'react-country-flag'
import { FaDollarSign, FaPlaneDeparture } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { JobCardMain, JobPageWrapper } from './style'
import { getJob } from './getJob.query'
import { onApplyToJob } from './applyToJob.mutation'
import { useQuery, useMutation } from '@tanstack/react-query'

const JobPostPage = (): JSX.Element => {
  const router = useRouter()
  const [jobPostId, setJobPostId] = useState('')
  const [applyJobStatus, setApplyJobStatus] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: [`/job/${jobPostId}`],
    queryFn: async () => await getJob(jobPostId),
    retry: true,
  })
  const { mutate, isPending } = useMutation({
    mutationKey: [`applyToJob/${jobPostId}`],
    mutationFn: onApplyToJob,
    onSuccess: () => {
      toast('Applied successfully', {
        position: 'top-right',
        autoClose: 5000,
        type: 'success',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },
  })

  const user = userStore((state) => state.user)

  useEffect(() => {
    if (router?.query) {
      setJobPostId(router?.query?.jobPostId as string)
    }
  }, [router])

  const applyToJob = (): void => {
    if (user?.id) {
      try {
        mutate({ jobPostId, applicantId: user?.id })
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message)
        } else {
          console.error('An unknown error occurred')
        }
      }
    }
  }

  if (isLoading) return <span>Loading...</span>

  return (
    <>
      <Head>
        <title>Employ Me - {data?.title}</title>
        <meta name="description" content={data?.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <JobPageWrapper>
        <JobCardMain>
          {/* TODO: Fix on api level, createdAt must not be undefined */}
          {/* @ts-ignore */}
          <JobCardHeadline recent={data?.recent ?? false} createdAt={data?.createdAt} />
          <h1>{data?.title}</h1>
          <JobPoints style={{ display: 'flex', justifyContent: 'space-between' }}>
            <li>
              <ReactCountryFlag
                countryCode={countriesList?.find((country) => country?.name === data?.location?.country)?.code ?? ''}
                aria-label={countriesList?.find((country) => country?.name === data?.location?.country)?.code}
                svg
                style={{ marginRight: 10 }}
              />
              {data?.location.city} - {data?.location.country}
            </li>
            <li>
              <FaPlaneDeparture /> {data?.locationType}
            </li>
            <li>
              <FaDollarSign /> ${data?.salary.from} up to ${data?.salary.to} {data?.salary.currency}/
              {data?.salary.period}
            </li>
          </JobPoints>
          {/* TODO: fix on api level, description must not be undefined */}
          {parse(data?.description ?? '')}

          <Popup
            content={
              <Message negative>
                <Message.Header>Error</Message.Header>
                {applyJobStatus}
              </Message>
            }
            closeOnEscape
            closeOnPortalMouseLeave
            onClose={(): void => setApplyJobStatus('')}
            open={!!applyJobStatus}
            trigger={
              <Button
                variant="contained"
                disabled={user?.jobsApplied?.includes(data?.id ?? '') || isPending}
                onClick={(): void => applyToJob()}
              >
                {/* TODO: fix on api level, id must not be undefined */}
                {/* @ts-ignore */}
                {user?.jobsApplied?.includes(data?.id)
                  ? 'Already applied for this position'
                  : 'Apply for this position'}
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
