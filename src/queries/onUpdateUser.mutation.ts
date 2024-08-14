import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from 'client'
import { enqueueSnackbar } from 'notistack'
import { userStore } from '~/stores'
import { components, GenericMutationHookResponse } from '~/types'

export type UpdateUserInput = {
  data: Partial<components['schemas']['UpdateUserInputDto']>
}
export type UpdateUserResponse = components['schemas']['UserOutputDto']
export type UserWithTokensOutputDto = components['schemas']['UserWithTokensOutputDto']
export type UpdateUserInputDto = components['schemas']['UpdateUserInputDto']

export const useOnUpdateUser = (): GenericMutationHookResponse<UserWithTokensOutputDto, UpdateUserInput> => {
  const user = userStore((state) => state.user)
  const setUser = userStore((state) => state.setUser)
  const userId = user?.id

  const onUpdateUser = async ({ data }: UpdateUserInput): Promise<UserWithTokensOutputDto> => {
    const requestData = {
      ...user,
      ...data,
    }
    try {
      const response = await axios.patch<UserWithTokensOutputDto>(`${BASE_URL}/user/${userId}`, requestData)
      return response.data
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
      enqueueSnackbar('User Update', { variant: 'success' })
    },
  })

  return { onCall: mutate, loading: isPending, error }
}
