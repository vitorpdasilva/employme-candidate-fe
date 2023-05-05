import { useEffect, useState } from 'react'

export const useUserAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(() => !!token)
    setAuthToken(() => token)
  }, [])

  return { isAuthenticated, authToken }
}
