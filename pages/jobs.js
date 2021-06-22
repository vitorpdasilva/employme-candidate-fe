import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import SearchJobBar from '../components/SearchJobBar';

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
    <div style={{ width: '100%', maxWidth: 1280, padding: '0 20px' }}>
      <SearchJobBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 1280 }}>
        <JobList jobList={jobList} />
        <div>right column</div>
      </div>
    </div>
  );
};

export default Dashboard;