import Headline from "./style";
import { TagNew } from "../TagNew";
import distanceFromNow from "../../helpers/distanceFromNow";

type JobCardHeadlineProps = {
  recent: boolean
  createdAt: Date
}

export const JobCardHeadline = ({ recent, createdAt }: JobCardHeadlineProps) => (
  <Headline>
    {recent && <span><TagNew /></span>}
    <small>{distanceFromNow(createdAt)}</small>
  </Headline>
);