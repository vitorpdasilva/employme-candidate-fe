import { StyledFormHolder } from "./style";
import { Button } from "../../components";
const body = {
  username: `-test-0.8187198489084304@test.com`,
  password: 'test123', //$2b$10$lWELf94CfOxyWsfe2e350eDOWFprt0F5Jscd8GXoQPWO7nK6sm1TG
  name: `Test - ${Math.random()}`,
}

const Register = () => {
  const submit = async () => {
    const res = await fetchApi({ url: '/register', body });
    console.log({ res });
  }
  return (
    <div style={{ width: 500 }}>
      <StyledFormHolder>
        <form>
          <input placeholder="name" />
          <input placeholder="username" />
          <input placeholder="password" />
          <Button>Register</Button>
        </form>
      </StyledFormHolder>
    </div>
  );
}

export default Register;