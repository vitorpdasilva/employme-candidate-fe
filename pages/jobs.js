import { useEffect, useState } from 'react';
import JobList from '../components/JobList';

const Dashboard = () => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/jobs').then(data => data.json());
      setJobList(data);
    }
    fetchData();
  }, []);
  
  return (
    <JobList jobList={jobList} />
  );
};

export default Dashboard;