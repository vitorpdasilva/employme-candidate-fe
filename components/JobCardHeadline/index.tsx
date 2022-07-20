import Headline from "./style";
import Tag from "../TagNew";
import distanceFromNow from "../../helpers/distanceFromNow";

type JobCardHeadlineProps = {
  recent: boolean
  createdAt: Date
}

const JobCardHeadline = ({ recent, createdAt }: JobCardHeadlineProps) => (
  <Headline>
    {recent && <span><Tag /></span>}
    <small>{distanceFromNow(createdAt)}</small>
  </Headline>
);

export default JobCardHeadline;