import { authStore, Tokens } from '~/stores'

type UseIsAuthenticatedProps = {
  isAuthenticated: boolean
  tokens: Tokens | null
}

export const useIsAuthenticated = (): UseIsAuthenticatedProps => {
  const tokens = authStore((state) => state.tokens)

  return {
    isAuthenticated: !!tokens,
    tokens,
  }
}
