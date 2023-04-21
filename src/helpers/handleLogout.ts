import { useRouter } from "next/navigation"
import { useAuthStore } from "stores/auth"

export function useLogout() {
  const clearUser = useAuthStore((state: any) => state.clearUser)
  const { push } = useRouter()
  
  const handleLogout = () => {
    clearUser()
    window.localStorage.clear()
    push("/")
  }
  
  return handleLogout
}
