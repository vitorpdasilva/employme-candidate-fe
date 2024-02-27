import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type AuthStore = {
  tokens: Tokens | null
  setTokens: (tokens: Tokens) => void
  logout: () => void
}

export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      tokens: null,
      setTokens: (tokens: Tokens): void => {
        set({ tokens })
      },
      logout: (): void => {
        set({ tokens: null })
      },
    }),
    {
      name: 'authStore',
    }
  )
)
