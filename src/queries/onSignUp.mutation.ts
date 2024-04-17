import axios from 'axios'
import { BASE_URL } from 'client'
import { GenericMutationHookResponse, components } from '~/types'
import { useMutation } from '@tanstack/react-query'
import { userStore, authStore } from '~/stores'
import { useRouter } from 'next/router'

export type SignUpResponse = components['schemas']['UserWithTokensOutputDto']
export type SignUpInput = components['schemas']['SignUpDto']

export const useOnSignUp = (): GenericMutationHookResponse<SignUpResponse, SignUpInput> => {
  const { setUser } = userStore()
  const { setTokens } = authStore()
  const router = useRouter()

  const onSignUp = async ({ name, email, password }: SignUpInput): Promise<SignUpResponse> => {
    return axios.post(`${BASE_URL}/auth/signup`, { name, email, password }).then((res) => res.data)
  }
  const { isPending, mutate, error } = useMutation({
    mutationFn: onSignUp,
    mutationKey: ['/auth/signup'],
    onSuccess: (success) => {
      if (!success?.userData) return
      setUser(success.userData)
      setTokens(success.tokens)
      router.push('/')
    },
  })

  return { onCall: mutate, loading: isPending, error }
}
