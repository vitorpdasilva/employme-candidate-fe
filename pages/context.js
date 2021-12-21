import { useState, createContext, useEffect, useMemo, useCallback } from "react";
import { fetchApi } from './client';

const Context = createContext();

export const AppContextProvider = ({ children }) => {
  const [skillList, setSkillList] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log('context.js -> load initial data');
    const fetchData = async () => {
      const { skillList } = await fetchApi({ url: '/skill-list' });
      setSkillList(skillList);
    }
    fetchData();
  }, []);

  const fetchSkillList = useCallback(value => console.log(value),  []);

  const fetchUserData = useCallback(async () => {
    const body = { email: "vitorboccio@gmail.com" };
    const data = await fetchApi({ url: '/user', body });
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