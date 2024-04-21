import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from 'client'
import { enqueueSnackbar } from 'notistack'
import { GenericMutationHookResponse, components } from '~/types'

export type ApplyToJobResponse = components['schemas']['JobDto']

export type OnApplyToJobInput = {
  jobPostId: string
  applicantId: string
}

export const useOnApplyToJob = (): GenericMutationHookResponse<ApplyToJobResponse, OnApplyToJobInput> => {
  const onApplyToJob = async ({ jobPostId, applicantId }: OnApplyToJobInput): Promise<ApplyToJobResponse> => {
    try {
      const result = await axios.post(`${BASE_URL}/job/${jobPostId}/apply`, { applicantId })
      return result.data
    } catch (error) {
      console.error({ error })
      throw new Error('Something went wrong')
    }
  }

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['applyToJob'],
    mutationFn: onApplyToJob,
    onSuccess: () => {
      enqueueSnackbar('Applied', { variant: 'success' })
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
  })
  return { onCall: mutate, loading: isPending, error }
}
