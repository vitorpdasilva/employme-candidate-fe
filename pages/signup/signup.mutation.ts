import axios from 'axios'
import { BASE_URL } from 'client'
import { components } from '~/types'

type SignUpResponse = components['schemas']['UserWithTokensOutputDto']

export const onSignUp = ({ name, email, password }: components['schemas']['SignUpDto']): Promise<SignUpResponse> => {
  return axios.post(`${BASE_URL}/auth/signup`, { name, email, password }).then((res) => res.data)
}
