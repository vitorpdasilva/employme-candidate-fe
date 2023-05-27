import { authStore } from '@/stores'

export const useIsAuthenticated = () => {
  const tokens = authStore((state: any) => state.tokens)
  
  return ({
    isAuthenticated: !!tokens,
    tokens
  })
}
