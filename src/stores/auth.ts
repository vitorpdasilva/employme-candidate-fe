import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type Tokens = {
  accessToken: string
  refreshToken: string
}

export const authStore = create(
  persist(
    (set) => ({
      tokens: null,
      setTokens: (tokens: Tokens) => {
        set({ tokens })
      },
      logout: () => {
        set({ tokens: null })
      },
    }),
    {
      name: 'authStore',
    }
  )
)
