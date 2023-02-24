import { fetchApi } from "client"
import { useEffect, useState } from "react"
import { JobList, SearchJobBar } from "src/components"

const Dashboard = () => {
  const [jobList, setJobList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { jobs } = await fetchApi({ url: "/jobs", method: "GET" })
      setJobList(jobs)
    }
    fetchData()
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <SearchJobBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1280,
        }}
      >
        <JobList jobList={jobList} />
        <div>right column</div>
      </div>
    </div>
  )
}

export default Dashboard
