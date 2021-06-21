import Headline from './style';
import Tag from '../TagNew';
import distanceFromNow from '../../helpers/distanceFromNow';

const JobCardHeadline = ({ recent, createdAt }) => (
  <Headline>
    {recent && <span><Tag /></span>}
    <small>{distanceFromNow(createdAt)}</small>
  </Headline>
);

export default JobCardHeadline;