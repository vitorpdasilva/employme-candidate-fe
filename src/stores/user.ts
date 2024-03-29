import { UserType } from 'src/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserStore = {
  user: Partial<UserType> | null
  setUser: (user: Partial<UserType>) => void
  clearUser: () => void
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user): void => set({ user }),
      clearUser: (): void => set({ user: null }),
    }),
    {
      name: 'user',
    }
  )
)
