import axios from 'axios'
import { BASE_URL } from 'client'
import { components } from '~/types'

export type SignInInput = components['schemas']['SignInDto']
export type SignInResponse = components['schemas']['UserWithTokensOutputDto']

export const onSignIn = ({ email, password }: SignInInput): Promise<SignInResponse> => {
  return axios.post(`${BASE_URL}/auth/login`, { email, password }).then((res) => res.data)
}
