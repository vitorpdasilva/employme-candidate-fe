import { UserType } from 'src/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserType) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
    }
  )
)
