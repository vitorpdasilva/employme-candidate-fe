import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import SearchJobBar from "../components/SearchJobBar";
import { fetchApi } from "./client";
const Dashboard = () => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { jobs } = await fetchApi({ url: "/jobs" });
      setJobList(jobs);
    };
    fetchData();
  }, []);
  
  return (
    <div style={{ width: "100%" }}>
      <SearchJobBar />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 1280 }}>
        <JobList jobList={jobList} />
        <div>right column</div>
      </div>
    </div>
  );
};

export default Dashboard;