import { useState, createContext, useEffect, useMemo, useCallback } from "react";

const Context = createContext();

export const AppContextProvider = ({ children }) => {
  const [skillList, setSkillList] = useState(null);
  
  useEffect(() => {
    console.log('context.js -> load initial data');
  }, []);

  const fetchSkillList = useCallback(value => console.log(value),  []);

  const providerValue = useMemo(
    () => ({
      skillList,
      actions: {
        fetchSkillList
      }
    }), 
    [
      skillList,
      fetchSkillList,
    ]
  );
  return (
    <Context.Provider value={providerValue}>{children}</Context.Provider>
  );
};

export default Context;