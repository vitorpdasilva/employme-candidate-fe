import { fetchApi } from "client"
import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { useUserAuth } from "src/hooks"

//TODO: add skillList, userData, fetchSkillList, fetchUserData to type context
const AppContext: any = createContext({})

type AppContextProviderProps = {
  children: ReactNode
}

type bodyUserRequest = {
  email: string
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [skillList, setSkillList] = useState(null)
  const [userData, setUserData] = useState(null)
  const { isAuthenticated } = useUserAuth()

  const fetchSkillList = useCallback(async () => {
    const { skillList } = await fetchApi({ url: "/skill-list" })
    setSkillList(skillList)
  }, [])

  const fetchUserData = useCallback(async (body: bodyUserRequest) => {
    const data = await fetchApi({ url: "/user", body })
    setUserData(data.user)
  }, [])

  const providerValue = useMemo(
    () => ({
      skillList,
      userData,
      isAuthenticated,
      actions: {
        fetchSkillList,
        fetchUserData,
      },
    }),
    [skillList, userData, fetchSkillList, fetchUserData]
  )
  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
