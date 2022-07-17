import { StyledFormHolder } from "./auth/style";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button, Title, Divider } from "../components";
import LinkedinSocialLoginPage from "../components/LinkedinSocialLoginPage";
import { fetchApi } from "./client"; 

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const submit = async ({ email, username, password }) => {
    const body = {
      email,
      username,
      password
    };
    try {
      const res = await fetchApi({ url: "/register", body });
      console.log({ res });
      router.push("/jobs");

    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ width: 500 }}>
      <StyledFormHolder>
        <Title>Join EMOverseas -- it's free!</Title>
        <p>Already on EMO? <Link href="signin"><a>Sign in</a></Link></p>
        <form onSubmit={handleSubmit(submit)}>
          {errors.email && <small style={{ float: "right" }}>This field is required</small>}
          <label>Email</label>
          <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="email" />
          
          {errors.username && <small style={{ float: "right" }}>This field is required</small>}
          <label>Username</label>
          <input {...register("username", { required: true })} placeholder="username" />
          
          {errors.password && <small style={{ float: "right" }}>This field is required</small>}
          <label>Password</label>
          <input type="password" {...register("password", { required: true })} placeholder="password" />
          
          <Button block>Register</Button>
          <Divider />
          <LinkedinSocialLoginPage />
        </form>
      </StyledFormHolder>
    </div>
  );
};

export default SignUp;