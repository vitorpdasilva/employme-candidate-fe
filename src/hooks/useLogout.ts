import { useRouter } from 'next/navigation'
import { authStore, userStore } from '~/stores'

export function useLogout(): () => void {
  const logoutAuth = authStore((state) => state.logout)
  const logoutUser = userStore((state) => state.clearUser)
  const { push } = useRouter()

  const handleLogout = (): void => {
    logoutAuth()
    logoutUser()
    push('/login')
  }

  return handleLogout
}
