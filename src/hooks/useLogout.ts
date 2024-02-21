import { useRouter } from 'next/navigation'
import { authStore, userStore } from '~/stores'

export function useLogout() {
  const logoutAuth = authStore((state: any) => state.logout)
  const logoutUser = userStore((state: any) => state.clearUser)
  const { push } = useRouter()

  const handleLogout = () => {
    logoutAuth()
    logoutUser()
    push('/login')
  }

  return handleLogout
}
