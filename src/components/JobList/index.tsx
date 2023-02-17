//@ts-ignore
import ReactCountryFlag from "react-country-flag";
import parse from "html-react-parser";
import { FaPlaneDeparture, FaDollarSign } from "react-icons/fa";
import JobListGrid from "./style";
import Card from "../Card";
import { JobPoints } from "../jobPoints";
import { JobCardHeadline } from "../JobCardHeadline";
import { SkillLabel } from "../SkillLabel";
import { JobDescription } from "../JobDescription";
import { countriesList } from "../../constants";

type IProps = {
  jobList: JobListProps[]
}

type JobListProps =  {
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
export const JobList = ({ jobList }: IProps) => (
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
          <li><FaPlaneDeparture /> {locationType}</li>
          <li><FaDollarSign /> ${salary.from} up to ${salary.to} {salary.currency}/{salary.period}</li>
        </JobPoints>
        <JobDescription>{parse(description)}</JobDescription>
        <div>
          {tags.map((tag: string) => <SkillLabel key={tag}>{tag}</SkillLabel>)}
        </div>
      </Card>
    ))}
  </JobListGrid>
);
