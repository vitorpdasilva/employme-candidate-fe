import { ReactNode, useState, createContext, useEffect, useMemo, useCallback } from "react";
import { useUserAuth } from "src/hooks";
import { fetchApi } from "./client";

//TODO: add skillList, userData, fetchSkillList, fetchUserData to type context
const Context: any = createContext({});

type AppContextProviderProps = {
  children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [skillList, setSkillList] = useState(null);
  const [userData, setUserData] = useState(null);
  const isAuthenticated = useUserAuth()
  useEffect(() => {
    console.log("context.js -> load initial data");
    console.log({ isAuthenticated })
    const fetchData = async () => {
      const { skillList } = await fetchApi({ url: "/skill-list" });
      setSkillList(skillList);
    };
    fetchData();
  }, []);

  const fetchSkillList = useCallback((value: string) => console.log(value),  []);

  const fetchUserData = useCallback(async () => {
    const body = { email: "vitorboccio@gmail.com" };
    const data = await fetchApi({ url: "/user", body });
    setUserData(data.user);
  }, []); 

  const providerValue = useMemo(
    () => ({
      skillList,
      userData,
      actions: {
        fetchSkillList,
        fetchUserData,
      }
    }), 
    [skillList, userData, fetchSkillList, fetchUserData]
  );
  return (
    <Context.Provider value={providerValue}>{children}</Context.Provider>
  );
};

export default Context;