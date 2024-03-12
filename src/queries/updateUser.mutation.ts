import axios from 'axios'
import { BASE_URL } from 'client'
import { components } from '~/types'

export type UpdateUserInput = {
  userId: string
  data: Partial<components['schemas']['UpdateUserInputDto']>
}
export type UpdateUserResponse = components['schemas']['UserOutputDto']
export type UserWithTokensOutputDto = components['schemas']['UserWithTokensOutputDto']

export const onUpdateUser = async ({ userId, data }: UpdateUserInput): Promise<UserWithTokensOutputDto> => {
  try {
    return await axios.patch(`${BASE_URL}/user/${userId}`, data).then((res) => res.data)
  } catch (error) {
    console.error({ error })
    throw new Error('Something went wrong')
  }
}
