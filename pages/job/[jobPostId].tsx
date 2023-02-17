import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext, useRef } from "react";
import parse from "html-react-parser";
import { Popup, Message } from 'semantic-ui-react'
import Head from "next/head";
// react-country-flag doesnt exist in @types npm-registry
// TODO: replace to a flag library that contain types
//@ts-ignore
import ReactCountryFlag from "react-country-flag";
import { toast, ToastContainer } from "react-toastify";
import { FaPlaneDeparture, FaDollarSign } from "react-icons/fa";
import { useRouter } from "next/router";
import { JobPoints } from "src/components/jobPoints";
import { fetchApi } from "client";
import { JobCardHeadline } from "src/components/JobCardHeadline";
import Button from "src/components/Button";
import { JobPageWrapper, JobCardMain } from "./style";
import { countriesList } from "../../src/constants";
import { AppContext } from "src/context";

type JobInfoType = {
  id: number,
  applicants: string[],
  recent: boolean,
  createdAt: Date,
  title: string,
  location: {
    city: string,
    country: string,
    province: string,
  },
  locationType: string,
  description: string,
  tags: string[],
  salary: {
    from: number,
    to: number,
    currency: string,
    period: string,
  }
}

const JobPostPage = () => {
  const router = useRouter();
  const [jobPostId, setJobPostId] = useState("");
  const [jobInfo, setJobInfo] = useState<JobInfoType | null>(null);
  const [applyJobStatus, setApplyJobStatus] = useState("")
  const { userData, actions: { fetchUserData } } = useContext(AppContext);
  const toastId = useRef<string | number>('');
  
  useEffect(() => {
    if (jobPostId) {
      const fetchData = async () => {
        const response = await fetchApi({ url: `/job/${jobPostId}`});
        setJobInfo(response); 
      };
      fetchData();
    }
  }, [jobPostId]);

  useEffect(() => {
    if (router?.query) {
      setJobPostId(router?.query?.jobPostId?.[0] ?? '');
    }
  }, [router]);

  const applyToJob = async () => {
    if (userData) {
      const body = {
        applicantId: userData.id
      };
      try {
        const { status, message } = await fetchApi({ url: `/job/${jobPostId}/apply`, body });
        toast(message, {
          position: 'top-right',
          autoClose: 5000,
          type: status,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        fetchUserData();
      } catch (err: any) {
        console.error(err.error)
      }
    } else {
      console.error("no user data");
    }
  };

  if (!jobInfo) return <span>Loading...</span>;
  if (!userData) {
    fetchUserData();
    return <span>Loading...</span>;
  }
  
  const { title, location, locationType, salary, recent, tags, id: jobId, description, createdAt } = jobInfo;
  
  return (
    <>
      <Head>
        <title>Employ Me - {title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <JobPageWrapper>
        <JobCardMain>
          <JobCardHeadline recent={recent} createdAt={createdAt} />
          <h1>{title}</h1>
          <JobPoints style={{ display: "flex", justifyContent: "space-between" }}>
            <li>
              <ReactCountryFlag 
                countryCode={countriesList?.find(country => country?.name === location?.country)?.code ?? ''}
                aria-label={countriesList?.find(country => country?.name === location?.country)?.code}
                svg
                style={{ marginRight: 10 }}
              />
              {location.city} - {location.country}
            </li>
            <li><FaPlaneDeparture /> {locationType}</li>
            <li><FaDollarSign /> ${salary.from} up to ${salary.to} {salary.currency}/{salary.period}</li>
          </JobPoints>
          {parse(description)}
          
          <Popup 
            content={
              <Message negative>
                <Message.Header>Error</Message.Header>
                {applyJobStatus}
              </Message>
            }
            closeOnEscape
            closeOnPortalMouseLeave
            onClose={() => setApplyJobStatus('')}
            open={!!applyJobStatus}
            trigger={
            <Button 
              primary 
              disabled={userData?.jobsApplied?.includes(jobId)} 
              onClick={() => applyToJob()}>
                {userData?.jobsApplied?.includes(jobId) ? "Already applied for this position" : "Apply for this position" }
              </Button>}
          />
        </JobCardMain>
        <div>Right Column</div>
      </JobPageWrapper>
      <ToastContainer />
    </>
  );
};

export default JobPostPage;