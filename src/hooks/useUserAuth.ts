import { authStore } from '~/stores'

export const useIsAuthenticated = () => {
  const tokens = authStore((state) => state.tokens)

  return {
    isAuthenticated: !!tokens,
    tokens,
  }
}
