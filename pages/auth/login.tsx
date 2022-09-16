import { fetchApi } from "../client";

const Login = () => {
  const body = {
    username: '',
    pwd: '',
  }
  const submitLogin = async () => {
    const log = await fetchApi({ url: "/login", body });
  };

  const submitRegister = () => {
    console.log('submitRegister')
  }

  return (
    <div>
      Login
      <button onClick={() => submitRegister()}>Submit register</button>
      <button onClick={() => submitLogin()}>Submit login</button>  
    </div>
  );
};

export default Login;
