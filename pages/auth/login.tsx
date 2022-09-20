import { fetchApi } from "../client";
import { useAuthStore } from "stores";

const Login = () => {
  const setUserToStore = useAuthStore((state: any) => state.setUser);

  const body = {
    email: 'vitorboccio@gmail.com',
    password: 'vitor123',
  }

  const submitLogin = async () => {
    const { user } = await fetchApi({ url: "/login", body });
    setUserToStore(user)
  };

  return (
    <div>
      Login
      <button onClick={() => submitLogin()}>Submit login</button>  
    </div>
  );
};

export default Login;
