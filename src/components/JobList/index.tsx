//@ts-ignore
import parse from 'html-react-parser'
import ReactCountryFlag from 'react-country-flag'
import { FaDollarSign, FaPlaneDeparture } from 'react-icons/fa'
import { countriesList } from '../../constants'
import Card from '../Card'
import { JobCardHeadline } from '../JobCardHeadline'
import { JobDescription } from '../JobDescription'
import { SkillLabel } from '../SkillLabel'
import { JobPoints } from '../jobPoints'
import JobListGrid from './style'

type IProps = {
  jobList: JobListProps[]
}

type JobListProps = {
  description: string
  location: {
    city: string
    country: string
  }
  locationType: string
  createdAt: Date
  recent: boolean
  salary: {
    from: string
    to: string
    currency: string
    period: string
  }
  title: string
  tags: string[]
  id: string
}
export const JobList = ({ jobList }: IProps): JSX.Element => (
  <JobListGrid>
    {jobList?.map(({ description, location, locationType, createdAt, recent, salary, title, tags, id }) => (
      <Card key={id} href={`/job/${id}`}>
        <JobCardHeadline recent={recent} createdAt={createdAt} />
        <h2>{title} &rarr;</h2>
        <JobPoints>
          <li>
            <ReactCountryFlag
              countryCode={countriesList?.find((country: any) => country?.name === location?.country)?.code ?? ''}
              aria-label={countriesList?.find((country: any) => country?.name === location?.country)?.code ?? ''}
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
        <div>
          {tags.map((tag: string) => (
            <SkillLabel key={tag}>{tag}</SkillLabel>
          ))}
        </div>
      </Card>
    ))}
  </JobListGrid>
)
