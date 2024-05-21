import { Avatar, Box, Divider, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useOnUpdateUser, UpdateUserInputDto } from '~/queries'
import { FC } from 'react'
import { jobSearchStatus } from '~/constants'
import { userStore } from '~/stores'
import { components } from '~/types'

type JobSearchStatus = components['schemas']['JobSearchStatus']

type FormFieldsValues = {
  value: JobSearchStatus
}

export const ProfileOverview: FC = () => {
  const { onCall, loading } = useOnUpdateUser()
  const userData = userStore((state) => state.user)

  // todo add loading state with skeleton component
  if (!userData) return <>Loading...</>

  const { professional, name, picture } = userData

  const onSubmit = async (data: FormFieldsValues): Promise<void> => {
    onCall({
      data: {
        preferences: {
          ...userData.preferences,
          jobSearchStatus: data.value,
        },
      } as Partial<UpdateUserInputDto>,
    })
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
              disabled={loading}
              defaultValue={userData.preferences?.jobSearchStatus ?? 0}
              onChange={(e): Promise<void> => onSubmit({ value: e.target.value as JobSearchStatus })}
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
