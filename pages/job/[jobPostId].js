import { useState, useEffect, useContext } from "react";
import parse from "html-react-parser";
import Head from "next/head";
import ReactCountryFlag from "react-country-flag";
import { FaPlaneDeparture, FaDollarSign } from "react-icons/fa";
import { useRouter } from "next/router";
import JobPoints from "../../components/jobPoints";
import { fetchApi } from "../client";
import JobCardHeadline from "../../components/JobCardHeadline";
import Button from "../../components/Button";
import { JobPageWrapper, JobCardMain } from "./style";
import { countriesList } from "../../constants";
import AppContext from "../context";

const JobPostPage = () => {
  const router = useRouter();
  const [jobPostId, setJobPostId] = useState("");
  const [jobInfo, setJobInfo] = useState(null);
  const { userData, actions: { fetchUserData } } = useContext(AppContext);
  
  useEffect(() => {
    if (jobPostId) {
      const fetchData = async () => {
        const response = await fetchApi({ url: `/job/${jobPostId}`});
        console.log({ response });
        setJobInfo(response);
      };
      fetchData();
    }
  }, [jobPostId]);

  useEffect(() => {
    if (router?.query) {
      setJobPostId(router.query.jobPostId);
    }
  }, [router]);

  const applyToJob = async () => {
    if (userData) {
      console.log("applyTojob", userData);
      const body = {
        applicantId: userData.id
      };
      const res = await fetchApi({ url: `/job/${jobPostId}/apply`, body });
      console.log({ res });
    } else {
      console.error("no user data");
    }
  };

  if (!jobInfo) return <span>Loading...</span>;

  const { title, location, locationType, salary, recent, tags, id, description, createdAt } = jobInfo;
  console.log({ jobInfo });
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
          {parse(description)}
          <Button onClick={() => applyToJob()}>Apply for this position</Button>
        </JobCardMain>
        <div>Right Column</div>
      </JobPageWrapper>
    </>
  );
};

export default JobPostPage;