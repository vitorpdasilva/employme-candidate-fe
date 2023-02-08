import create from 'zustand'
import { persist } from 'zustand/middleware'
import { UserType } from 'types/user'

export type AuthStoreType = {
  user: UserType | null
  setUser: (user: UserType) => void
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserType) => {
        window.localStorage.setItem('user', JSON.stringify(user))
        set({ user })
      },
    }),
    {
      name: 'userAuth',
    }
  )
)