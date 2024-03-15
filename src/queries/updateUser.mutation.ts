import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from 'client'
import { enqueueSnackbar } from 'notistack'
import { userStore } from '~/stores'
import { components } from '~/types'

export type UpdateUserInput = {
  userId: string
  data: Partial<components['schemas']['UpdateUserInputDto']>
}
export type UpdateUserResponse = components['schemas']['UserOutputDto']
export type UserWithTokensOutputDto = components['schemas']['UserWithTokensOutputDto']

type OnUpdateUserReturn = {
  onUpdateUser: UseMutateFunction<UserWithTokensOutputDto, Error, UpdateUserInput, unknown>
  loading: boolean
  error: Error | null
}

export const useOnUpdateUser = (): OnUpdateUserReturn => {
  const setUser = userStore((state) => state.setUser)
  const onUpdateUser = async ({ userId, data }: UpdateUserInput): Promise<UserWithTokensOutputDto> => {
    try {
      const response = await axios.patch<UserWithTokensOutputDto>(`${BASE_URL}/user/${userId}`, data)
      return response.data // Assuming the response data has the structure { userData: ..., tokens: ... }
    } catch (error) {
      console.error({ error })
      throw new Error('Something went wrong')
    }
  }

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: onUpdateUser,
    onSuccess: (success) => {
      setUser(success.userData)
      enqueueSnackbar('Preferences updated', { variant: 'success' })
    },
  })

  return { onUpdateUser: mutate, loading: isPending, error }
}