import { StyledFormHolder } from "./auth/style";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { Button } from "../components";
import { fetchApi } from "./client"; 

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter()
  const submit = async ({ email, username, password }) => {
    const body = {
      email,
      username,
      password
    }
    try {
      const res = await fetchApi({ url: '/register', body });
      console.log({ res });
      router.push('/jobs');

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div style={{ width: 500 }}>
      <StyledFormHolder>
        <form onSubmit={handleSubmit(submit)}>
          {errors.email && <small>This field is required</small>}
          <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="email" />
          
          {errors.username && <small>This field is required</small>}
          <input {...register("username", { required: true })} placeholder="username" />
          
          {errors.password && <small>This field is required</small>}
          <input type="password" {...register("password", { required: true })} placeholder="password" />
          
          <Button>Register</Button>
        </form>
      </StyledFormHolder>
    </div>
  );
}

export default Register;