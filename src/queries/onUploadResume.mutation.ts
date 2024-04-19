import axios from 'axios'
import { BASE_URL } from 'client'
import { components, GenericMutationHookResponse } from '~/types'
import { userStore } from '~/stores'
import { enqueueSnackbar } from 'notistack'
import { useMutation } from '@tanstack/react-query'

type UserWithTokensOutputDto = components['schemas']['UserWithTokensOutputDto']

export const useOnResumeUpload = (): GenericMutationHookResponse<UserWithTokensOutputDto, File> => {
  const user = userStore((state) => state.user)
  // const setUser = userStore((state) => state.setUser)
  const userId = user?.id

  const onUploadResume = async (file: File): Promise<UserWithTokensOutputDto> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post<UserWithTokensOutputDto>(`${BASE_URL}/user/${userId}/resume`, formData)
      return response.data
    } catch (error) {
      console.error({ error })
      throw new Error('Something went wrong')
    }
  }

  const { mutate, isPending, error } = useMutation({
    mutationKey: [`${userId}/resume`],
    mutationFn: (file: File) => onUploadResume(file),
    onSuccess: () => {
      // setUser(success.userData)
      // console.log({ success })
      enqueueSnackbar('Resume Uploaded', { variant: 'success' })
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
  })
  return { onCall: mutate, loading: isPending, error }
}
