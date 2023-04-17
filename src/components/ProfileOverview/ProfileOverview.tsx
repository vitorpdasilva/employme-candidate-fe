import { Avatar, Box, Divider, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { fetchApi } from "client"
import Link from "next/link"
import { FC } from "react"
import { countriesList, jobSearchStatus } from "src/constants"
import { useAuthStore } from "src/stores"

type FormFieldsValues = {
  value: number
  name: string
}

export const ProfileOverview: FC = () => {
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  // todo add loading state with skeleton component
  if (!userData) return <>Loading...</>

  const onSubmit = async (data: FormFieldsValues) => {
    const requestData = {
      id: userData.id,
      username: userData.username,
      ...userData,
      preferences: {
        ...userData.preferences,
        [data.name]: {
          id: data.value,
          label: jobSearchStatus.filter((item) => item.value === data.value)[0].label,
        },
      },
    }

    const { user: updatedUser, token } = await fetchApi({
      url: "/user",
      method: "PATCH",
      body: requestData,
    })
    setUserStore(updatedUser, token)
  }

  console.log({ userData })

  return (
    <Paper elevation={2} sx={{ display: "flex", py: 5, px: 3 }}>
      <Avatar alt={userData?.name} src={userData?.picture.data} sx={{ width: 56, height: 56 }} />
      <Box sx={{ mx: 3, flexGrow: 1 }}>
        <Typography variant="h5">{userData?.name}</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          Front-end Developer @ Rivian
        </Typography>
        <Typography variant="subtitle1">
          {countriesList.find(({ code }) => code === userData?.general?.currentLocation)?.name}
        </Typography>
        <Divider sx={{ my: 2, visibility: "hidden" }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Where are you on your job search?
        </Typography>
        <Typography variant="subtitle1">
          Keep your job status up-to-date to inform employers of your search.
        </Typography>
        <TextField
          name="jobSearchStatus"
          select
          fullWidth
          defaultValue={userData.preferences?.jobSearchStatus?.id ?? 0}
          onChange={(e) => onSubmit({ name: e.target.name, value: Number(e.target.value) })}
        >
          {jobSearchStatus.map(({ value, label }) => (
            <MenuItem key={value} value={value} aria-label={label}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box>
        <Link href="/profile">View your public profile</Link>
      </Box>
    </Paper>
  )
}
