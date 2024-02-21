import distanceFromNow from '../../helpers/distanceFromNow'
import { TagNew } from '../TagNew'
import Headline from './style'

type JobCardHeadlineProps = {
  recent: boolean
  createdAt: Date
}

export const JobCardHeadline = ({ recent, createdAt }: JobCardHeadlineProps): JSX.Element => (
  <Headline>
    {recent && (
      <span>
        <TagNew />
      </span>
    )}
    <small>{distanceFromNow(createdAt)}</small>
  </Headline>
)
