import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserType } from 'src/types'

export type AuthStoreType = {
  user: UserType | null
  setUser: (user: UserType) => void
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserType, token: string) => {
        window.localStorage.setItem('token', token)
        set({ user })
      },
    }),
    {
      name: 'user',
    }
  )
)