import { Avatar, Box, Divider, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useFetchApi } from 'client'
import { FC } from 'react'
import { jobSearchStatus } from 'src/constants'
import { authStore, userStore } from 'src/stores'

type FormFieldsValues = {
  value: number
  name: string
}

export const ProfileOverview: FC = () => {
  console.log('asdjiasjda')
  const { fetchApi } = useFetchApi()
  const userData = userStore((state) => state.user)
  const setUserStore = userStore((state) => state.setUser)
  const setTokens = authStore((state) => state.setTokens)

  // todo add loading state with skeleton component
  if (!userData) return <>Loading...</>

  const { professional, preferences, id, username, name, picture } = userData

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
    <Paper elevation={2} sx={{ p: 2 }}>
      <Grid container direction={{ xs: 'column-reverse', md: 'row' }} spacing={2}>
        <Grid xs={12}>
          <Stack direction="row" spacing={2} justifyItems={'center'}>
            <Avatar alt={name} src={picture?.data} sx={{ width: 56, height: 56 }} />
            <Stack direction={'column'} justifyContent={'center'}>
              <Typography variant="h5">{name}</Typography>
              {professional?.workExperience?.find((workItem) => !!workItem.current) ? (
                <Typography variant="subtitle1">@ {'company name'}</Typography>
              ) : null}
            </Stack>
          </Stack>

          <Box>
            <Divider sx={{ my: 1 }} />
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
        </Grid>
      </Grid>
    </Paper>
  )
}
