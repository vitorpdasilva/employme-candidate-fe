import axios from 'axios'
import { BASE_URL } from 'client'
import { components } from '~/types'

export type ApplyToJobResponse = components['schemas']['JobDto']

export type OnApplyToJobInput = {
  jobPostId: string
  applicantId: string
}

export const onApplyToJob = ({ jobPostId, applicantId }: OnApplyToJobInput): Promise<ApplyToJobResponse> => {
  return axios.post(`${BASE_URL}/job/${jobPostId}/apply`, { applicantId }).then((res) => res.data)
}
