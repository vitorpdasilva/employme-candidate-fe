import { useState, useLayoutEffect } from "react";

export const useUserAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")
    setAuthenticated(!!token)
  }, []);

  return authenticated;
};
