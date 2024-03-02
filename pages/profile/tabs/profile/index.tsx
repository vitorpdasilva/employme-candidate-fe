import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useFetchApi } from 'client'
import { useSnackbar } from 'notistack'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { professionList } from '~/constants'
import { CompressedImage, compressImage } from '~/helpers'
import { userStore } from '~/stores'
import { Education } from './education'
import { Location } from './location'
import { Social } from './social'
import { WorkExperience } from './work-exp'

type FormFields = {
  name: string
  bio: string
  currentLocation: string
}
export const Profile = (): JSX.Element => {
  const { fetchApi } = useFetchApi()
  const { enqueueSnackbar } = useSnackbar()
  const user = userStore((state) => state.user)
  const setUserStore = userStore((state) => state.setUser)

  const { register, handleSubmit, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      name: user?.name,
      bio: user?.general?.bio,
    },
  })

  const fieldWatch = watch()

  if (!user) return <>Loading...</>

  const { professional } = user
  const selectedRoles = professionList
    .filter((profession) => {
      return professional?.preferencesToWork?.includes(profession.value)
    })
    .map((role) => role.text)

  const handleChange = async (data: FormFields): Promise<void> => {
    const requestData = {
      id: user.id,
      username: user.username,
      name: data.name,
      general: {
        ...user.general,
        bio: data.bio,
      },
    }
    try {
      const { userData: updatedUser } = await fetchApi({
        url: `/user/${user.id}`,
        method: 'PATCH',
        body: requestData,
      })
      setUserStore(updatedUser)
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (error) {
      console.log({ error })
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload = async (): Promise<void> => {
      const compressedImage: CompressedImage = await compressImage(file as File, 800, 600, 0.7)
      const requestData = {
        id: user.id,
        username: user.username,
        name: user.name,
        picture: {
          data: compressedImage.dataUrl,
          createdDate: new Date().toISOString(),
          ...file,
        },
      }
      try {
        const { user: updatedUser } = await fetchApi({
          url: '/user',
          method: 'PATCH',
          body: requestData,
        })
        setUserStore(updatedUser)
        enqueueSnackbar('Profile updated successfully', { variant: 'success' })
      } catch (error) {
        console.log({ error })
        enqueueSnackbar('Something went wrong', { variant: 'error' })
      }
    }
    reader.onerror = (error): void => {
      console.log('error', error)
    }
  }

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <form onSubmit={handleSubmit(handleChange)}>
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
              {...register('name')}
              onChange={(e): void => setValue('name', e.target.value)}
            />
            {fieldWatch.name !== user?.name && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="text" onClick={(): void => setValue('name', '')}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt={`${user?.name}'s picture`} src={user?.picture} sx={{ width: 56, height: 56, mr: 3 }} />
              <input type="file" onChange={handleFileChange} name="file" />
            </Box>
            <Box sx={{ my: 3, display: 'flex' }}>
              <TextField
                sx={{ flexGrow: 1 }}
                defaultValue={professional?.profession}
                select
                label="Select your primary role"
              >
                {professionList.map((profession) => (
                  <MenuItem key={profession.text as string} value={profession?.value}>
                    {profession?.text}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                defaultValue={professional?.yearsOfExperience}
                select
                sx={{ width: '35%', ml: 3 }}
                label="Years of Experience"
              >
                {[...Array(10).keys()].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year} {year !== 1 ? 'years' : 'year'}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="demo-multiple-checkbox-label">Open for the following roles</InputLabel>
              <Select
                label="Open for the following roles"
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-chip"
                fullWidth
                multiple
                value={selectedRoles}
                renderValue={(selected): JSX.Element => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {professionList.map((profession) => (
                  <MenuItem key={profession?.text} value={profession?.value}>
                    {profession?.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ my: 3 }}>
              <TextField fullWidth multiline rows={4} label="Your Bio" {...register('bio')} />
              {fieldWatch.bio !== user?.general?.bio && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                  <Button variant="text" onClick={(): void => setValue('bio', user?.general?.bio as string)}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>

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
