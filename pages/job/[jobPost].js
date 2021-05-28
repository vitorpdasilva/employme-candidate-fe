import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const JobPostPage = () => {
  const router = useRouter();
  const { jobPost } = router.query;
  const [jobInfo, setJobInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/job/${jobPost}`).then(data => data.json());
      setJobInfo(response);
    }
    fetchData();
  }, []);
  console.log({ jobInfo });
  if (!jobInfo) return <span>Loading...</span>;
  return (
    <div>
      <h1>{jobInfo.title}</h1>
      <ul>
        <li>{jobInfo.location}</li>
        <li>{jobInfo.locationType}</li>
        <li>{jobInfo.salary.from} up to {jobInfo.salary.to} {jobInfo.salary.currency}/{jobInfo.salary.period}</li>
      </ul>
      <p>{jobInfo.description}</p>
      <button>Apply for this position</button>
    </div>

  )
}

export default JobPostPage;