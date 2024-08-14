import axios from 'axios'
import { BASE_URL } from 'client'
import { GenericMutationHookResponse, components } from '~/types'
import { useMutation } from '@tanstack/react-query'
import { userStore, authStore } from '~/stores'
import { useRouter } from 'next/router'

export type SignInInput = components['schemas']['SignInDto']
export type SignInResponse = components['schemas']['UserWithTokensOutputDto']

export const useOnSignIn = (): GenericMutationHookResponse<SignInResponse, SignInInput> => {
  const { setUser } = userStore()
  const { setTokens } = authStore()
  const router = useRouter()

  const onSignIn = async ({ email, password }: SignInInput): Promise<SignInResponse> => {
    try {
      return await axios.post(`${BASE_URL}/auth/login`, { email, password }).then((res) => res.data)
      // typescript cant infer a type on a catch block
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error({ err })
      throw new Error(err?.response?.data?.message ?? 'Something went wrong')
    }
  }

  const { isPending, mutate, error } = useMutation({
    mutationFn: onSignIn,
    mutationKey: ['/auth/signin'],
    onSuccess: (success) => {
      if (!success?.userData) return
      setUser(success.userData)
      setTokens(success.tokens)
      router.push('/')
    },
  })

  return { onCall: mutate, loading: isPending, error }
}
