import axios from 'axios'
import { BASE_URL } from 'client'
import { components } from '~/types'

export type GetJobResponse = components['schemas']['JobDto']

export const getJob = (id: string): Promise<GetJobResponse> => {
  return axios.get(`${BASE_URL}/job/${id}`).then((res) => res.data)
}
