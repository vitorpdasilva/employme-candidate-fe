import { Avatar, Box, Divider, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useFetchApi } from 'client'
import Link from 'next/link'
import { FC } from 'react'
import { countriesList, jobSearchStatus } from 'src/constants'
import { authStore, userStore } from 'src/stores'

type FormFieldsValues = {
  value: number
  name: string
}

export const ProfileOverview: FC = () => {
  const { fetchApi } = useFetchApi()
  const userData = userStore((state) => state.user)
  const setUserStore = userStore((state) => state.setUser)
  const setTokens = authStore((state) => state.setTokens)

  // todo add loading state with skeleton component
  if (!userData) return <>Loading...</>

  const { professional, preferences, id, username, name, general, picture } = userData

  const onSubmit = async (data: FormFieldsValues): Promise<void> => {
    const requestData = {
      id,
      username,
      ...userData,
      preferences: {
        ...preferences,
        [data.name]: {
          id: data.value,
          label: jobSearchStatus.filter((item) => item.value === data.value)[0].label,
        },
      },
    }

    const { user: updatedUser, token } = await fetchApi({
      url: '/user',
      method: 'PATCH',
      body: requestData,
    })
    setUserStore(updatedUser)
    setTokens(token)
  }

  return (
    <Paper elevation={2} sx={{ display: 'flex', py: 5, px: 3 }}>
      <Avatar alt={name} src={picture} sx={{ width: 56, height: 56 }} />
      <Box sx={{ mx: 3, flexGrow: 1 }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {!!professional?.workExperiences && <>{userData.professional?.workExperiences?.[0]?.title}</>}
          {!professional?.workExperiences?.[0]?.endDate && (
            <> @ {professional?.workExperiences.find((work) => !!work.current)?.company}</>
          )}
        </Typography>
        <Typography variant="subtitle1">
          {countriesList.find(({ code }) => code === general?.currentLocation)?.name}
        </Typography>
        <Divider sx={{ my: 2, visibility: 'hidden' }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Where are you on your job search?
        </Typography>
        <Typography variant="subtitle1">Keep your job status up-to-date to inform employers of your search.</Typography>
        <TextField
          name="jobSearchStatus"
          select
          fullWidth
          // todo: fix type here when change to enum on the api
          defaultValue={userData.preferences?.jobSearchStatus ?? 0}
          onChange={(e): Promise<void> => onSubmit({ name: e.target.name, value: Number(e.target.value) })}
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
