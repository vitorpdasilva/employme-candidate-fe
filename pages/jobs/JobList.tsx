//@ts-ignore
import parse from 'html-react-parser'
import ReactCountryFlag from 'react-country-flag'
import { FaDollarSign, FaPlaneDeparture } from 'react-icons/fa'
import { countriesList } from '../../src/constants'
import { Card, JobCardHeadline, JobDescription, JobPoints } from '~/components'

import { components } from '~/types'
import { Box, Chip, Stack, styled } from '@mui/material'

type JobResponse = components['schemas']['JobDto']
type JobListProps = {
  jobList: JobResponse[] | undefined
}

const JobListGrid = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: '3rem',
})

export const JobList = ({ jobList }: JobListProps): JSX.Element => (
  <JobListGrid>
    {jobList?.map(
      ({ description, location, locationType, createdAt, recent, salary, title, tags, id }: JobResponse) => (
        <Card key={id} href={`/job/${id}`}>
          <JobCardHeadline recent={recent} createdAt={createdAt as unknown as Date} />
          <h2>{title} &rarr;</h2>
          <JobPoints>
            <li>
              <ReactCountryFlag
                countryCode={countriesList?.find((country) => country?.name === location?.country)?.code ?? ''}
                aria-label={countriesList?.find((country) => country?.name === location?.country)?.code ?? ''}
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
          <JobDescription>{parse(description)}</JobDescription>
          <Stack direction={'row'} spacing={2} mt={2}>
            {tags.map((tag: string) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" color="primary" />
            ))}
          </Stack>
        </Card>
      )
    )}
  </JobListGrid>
)
