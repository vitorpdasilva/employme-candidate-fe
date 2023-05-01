import { useAuthStore } from '@/stores'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const clearUser = useAuthStore((state: any) => state.clearUser)
  const { push } = useRouter()

  const handleLogout = () => {
    clearUser()
    window.localStorage.clear()
    push('/login')
  }

  return handleLogout
}
