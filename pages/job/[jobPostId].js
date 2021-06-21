import { useState, useEffect } from 'react';
import Head from 'next/head';
import ReactCountryFlag from "react-country-flag";
import { FaPlaneDeparture, FaDollarSign } from 'react-icons/fa';
import distanceFromNow from '../../helpers/distanceFromNow';
import { useRouter } from 'next/router';
import Tag from '../../components/TagNew';
import JobPoints from '../../components/jobPoints';
import JobCardHeadline from '../../components/JobCardHeadline';
import { JobPageWrapper, JobCardMain } from './style';

import { countriesList } from '../../countriesList';

const JobPostPage = () => {
  const router = useRouter();
  const [jobPostId, setJobPostId] = useState("");
  const [jobInfo, setJobInfo] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/job/${jobPostId}`).then(data => data.json());
      setJobInfo(response);
    }
    fetchData();
  }, [jobPostId]);

  useEffect(() => {
    if (router && router.query) {
      setJobPostId(router.query.jobPostId)
    }
  }, [router]);

  if (!jobInfo) return <span>Loading...</span>;
  const { title, location, locationType, salary, recent, tags, id, description, createdAt } = jobInfo;
  return (
    <>
      {console.log({ jobInfo })}
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
                countryCode={countriesList.find(country => country.name === location.country).code}
                aria-label={countriesList.find(country => country.name === location.country).code}
                svg
                style={{ marginRight: 10 }}
              />
              {location.city} - {location.country}
            </li>
            <li><FaPlaneDeparture /> {locationType}</li>
            <li><FaDollarSign /> ${salary.from} up to ${salary.to} {salary.currency}/{salary.period}</li>
          </JobPoints>
          <p>{description}</p>
          <button>Apply for this position</button>
        </JobCardMain>
        <div>Right Column</div>
      </JobPageWrapper>
    </>
  )
}

export default JobPostPage;