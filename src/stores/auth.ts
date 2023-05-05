import { UserType } from 'src/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type Tokens = {
  accessToken: string
  refreshToken: string
}
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserType, tokens: Tokens) => {
        window.localStorage.setItem('accessToken', tokens.accessToken)
        window.localStorage.setItem('refreshToken', tokens.refreshToken)
        set({ user })
      },
      clearUser: () => {
        set({ user: null })
      },
      logout: () => {
        window.localStorage.clear()
        set({ user: null })
      },
    }),
    {
      name: 'user',
    }
  )
)
