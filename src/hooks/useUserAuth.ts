import { authStore } from '~/stores'

export const useIsAuthenticated = (): boolean => {
  const tokens = authStore((state) => state.tokens)

  return !!tokens
}
