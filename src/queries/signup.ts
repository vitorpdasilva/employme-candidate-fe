import axios from 'axios'
import { BASE_URL } from 'client'
import { components } from '~/types'

export const signup = ({ name, email, password }: components['schemas']['SignUpDto']) => {
  return axios.post(`${BASE_URL}/auth/signup`, { name, email, password }).then((res) => res.data)
}
