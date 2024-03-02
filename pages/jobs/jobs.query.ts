import axios from 'axios'
import { BASE_URL } from 'client'
import { components } from '~/types'

type Jobs = components['schemas']['JobDto']

export const jobListQuery = (): Promise<Jobs[]> => {
  return axios.get(`${BASE_URL}/job/list`).then((res) => res.data)
}
