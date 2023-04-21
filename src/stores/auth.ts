import { UserType } from "src/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserType, token: string) => {
        window.localStorage.setItem("token", token)
        set({ user })
      },
      clearUser: () => {
        window.localStorage.clear()
        set({ user: null })
      }
    }),
    {
      name: "user",
    }
  )
)
