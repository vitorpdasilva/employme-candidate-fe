import { Alert, Box, Button, Link, styled, TextField, Typography } from "@mui/material"
import { ErrorResponse, fetchApi } from "client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Resolver, useForm } from "react-hook-form"
import { useUserAuth } from "src/hooks"
import { useAuthStore } from "stores/auth"

type Credentials = {
  username: string
  password: string
  name: string
}

const FormWrapper = styled(Box)({
  border: "1px solid #c5c5c5",
  display: "flex",
  flexDirection: "column",
  padding: "3em",
  borderRadius: "10px",
  justifyContent: "space-around",
  background: "#f3f3f3",
  "& input": {
    background: "#fff",
  },
})

const resolver: Resolver<Credentials> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
        username: { type: "required", message: "Username is required" },
      }
      : {},
  }
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<Credentials>({ resolver })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { isAuthenticated } = useUserAuth()
  const setUserToStore = useAuthStore((state: any) => state.setUser)

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage(null)
    const body = {
      email: data.username,
      password: data.password,
    }

    try {
      const { user, token } = await fetchApi({ url: "/register", body })
      setUserToStore(user, token)
      localStorage.setItem("isAuthenticated", `${!!token}`)
      router.push("/")
    } catch (error: any) {
      setErrorMessage(error?.message as ErrorResponse["message"])
    }
  })

  return (
    <FormWrapper component="form" onSubmit={onSubmit} onChange={() => setErrorMessage(null)}>
      {errorMessage && (
        <Alert sx={{ my: 2 }} severity="error">
          {errorMessage}
        </Alert>
      )}
      <TextField {...register("name")} label="Your Name" variant="outlined" />
      <TextField {...register("username")} label="username" variant="outlined" />
      <TextField
        {...register("password")}
        type="password"
        sx={{ my: 2 }}
        label="password"
        variant="outlined"
      />
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
      <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
        Already have an account? <Link href="/auth/login">Sign in</Link>
      </Typography>
    </FormWrapper>
  )
}

export default SignUp
