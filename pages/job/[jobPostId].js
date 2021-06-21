import { useState, useEffect } from 'react';
import Head from 'next/head';
import distanceFromNow from '../../helpers/distanceFromNow';
import { useRouter } from 'next/router';
import Tag from '../../components/TagNew';
import JobCardMain, { HeadLine } from './style';

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

      <JobCardMain>
        <HeadLine>
          {recent && <Tag />}
          <small>{distanceFromNow(createdAt)}</small>
        </HeadLine>
        <h1>{title}</h1>
        <ul>
          <li>{location.city} - {location.country}</li>
          <li>{locationType}</li>
          <li>{salary.from} up to {salary.to} {salary.currency}/{salary.period}</li>
        </ul>
        <p>{description}</p>
        <button>Apply for this position</button>
      </JobCardMain>
    </>
  )
}

export default JobPostPage;