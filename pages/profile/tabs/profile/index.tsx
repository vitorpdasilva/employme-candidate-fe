import { Box, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useOnUpdateUser, UpdateUserInputDto } from '~/queries'
import { ProfilePicture } from '~/components'
import { professionList } from '~/constants'
import { userStore } from '~/stores'
import { Education } from './education'
import { Location } from './location'
import { Social } from './social'
import { WorkExperience } from './work-exp'
import { useDebounce } from '~/hooks'
import { components } from '~/types'

type General = components['schemas']['UserGeneralDto']
type Professional = components['schemas']['UserProfessionalDto']

export const Profile = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const { onUpdateUser: onUpdateUserGeneral } = useOnUpdateUser()

  if (!user) return <>Loading...</>
  const { professional } = user

  const onSubmit = async (data: Partial<UpdateUserInputDto>): Promise<void> => {
    const requestData = {
      ...data,
    }
    onUpdateUserGeneral({ userId: user.id ?? '', data: requestData })
  }

  const debouncedSubmit = useDebounce(onSubmit, 800)

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">About</Typography>
          <Typography variant="subtitle2">Tell us about yourself so startups know who you are.</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Your Name"
            defaultValue={user?.name}
            onChange={(e): void => debouncedSubmit({ name: e.target.value })}
          />

          <ProfilePicture />

          <Box sx={{ my: 3, display: 'flex' }}>
            <TextField
              sx={{ flexGrow: 1 }}
              defaultValue={professional?.profession}
              select
              label="Select your primary role"
              onChange={(e): Promise<void> =>
                onSubmit({
                  professional: {
                    ...user?.professional,
                    profession: e.target.value as Professional['profession'],
                  } as Professional,
                })
              }
            >
              {professionList.map((profession) => (
                <MenuItem key={profession.value} value={profession?.value}>
                  {profession?.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              defaultValue={String(professional?.yearsOfExperience)}
              select
              sx={{ width: '35%', ml: 3 }}
              label="Years of Experience"
              onChange={(e): Promise<void> =>
                onSubmit({
                  professional: {
                    ...user?.professional,
                    yearsOfExperience: Number(e.target.value),
                  } as Professional,
                })
              }
            >
              {[...Array(30).keys()].map((year) => (
                <MenuItem key={year} value={String(year)}>
                  {year} {year !== 1 ? 'years' : 'year'}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Bio"
              defaultValue={user?.general?.bio}
              onChange={(e): void =>
                debouncedSubmit({
                  general: {
                    ...user?.general,
                    bio: e.target.value,
                  } as General,
                })
              }
            />
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Location />

      <Divider />

      <Social />

      <Divider />

      <WorkExperience />

      <Divider />

      <Education />
    </Box>
  )
}
