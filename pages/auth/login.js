import { fetchApi } from '../client';

const Login = () => {
  
  const submitLogin = async () => {
    const log = await fetchApi({ url: '/login', body });
    console.log({ log });
  }

  return (
    <div>
      Login
      <button onClick={() => submit()}>Submit register</button>
      <button onClick={() => submitLogin()}>Submit login</button>  
    </div>
  );
}

export default Login;
