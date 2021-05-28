import { useRouter } from 'next/router';

const JobIdPage = () => {
  const router = useRouter();
  const { jobId } = router.query;
  console.log({ jobId });
  const test = await fetch('/api/job/0').then(data => data.json());
  return (
    <>{jobId}</>
  )
}

export default JobIdPage;