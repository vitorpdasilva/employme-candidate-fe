import { CompressedImage, compressImage } from '@/helpers'
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
import { fetchApi } from 'client'
import { useSnackbar } from 'notistack'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { professionList } from 'src/constants'
import { useAuthStore } from 'src/stores'
import { Education } from './education'
import { Location } from './location'
import { Social } from './social'
import { WorkExperience } from './work-exp'

type FormFields = {
  name: string
  bio: string
  currentLocation: string
}
export const Profile = () => {
  const { enqueueSnackbar } = useSnackbar()
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  const { register, handleSubmit, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      name: userData?.name,
      bio: userData?.general?.bio,
    },
  })

  const fieldWatch = watch()

  if (!userData) return <>Loading...</>

  const { professional } = userData
  const selectedRoles = professionList
    .filter((profession) => {
      return professional?.preferenceToWork?.includes(profession.value)
    })
    .map((role) => role.text)

  const handleChange = async (data: FormFields) => {
    const requestData = {
      id: userData.id,
      username: userData.username,
      name: data.name,
      general: {
        ...userData.general,
        bio: data.bio,
      },
    }
    try {
      const { user: updatedUser, token } = await fetchApi({
        url: '/user',
        method: 'PATCH',
        body: requestData,
      })
      setUserStore(updatedUser, token)
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (error) {
      console.log({ error })
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload = async () => {
      const compressedImage: CompressedImage = await compressImage(file as File, 800, 600, 0.7)
      const requestData = {
        id: userData.id,
        username: userData.username,
        name: userData.name,
        picture: {
          data: compressedImage.dataUrl,
          createdDate: new Date().toISOString(),
          ...file,
        },
      }
      try {
        const { user: updatedUser, token } = await fetchApi({
          url: '/user',
          method: 'PATCH',
          body: requestData,
        })
        setUserStore(updatedUser, token)
        enqueueSnackbar('Profile updated successfully', { variant: 'success' })
      } catch (error) {
        console.log({ error })
        enqueueSnackbar('Something went wrong', { variant: 'error' })
      }
    }
    reader.onerror = (error) => {
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
              onChange={(e) => setValue('name', e.target.value)}
            />
            {fieldWatch.name !== userData?.name && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="text" onClick={() => setValue('name', userData?.name)}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt={`${userData?.name}'s picture`}
                src={userData?.picture?.data}
                sx={{ width: 56, height: 56, mr: 3 }}
              />
              <input
                type="file"
                onChange={handleFileChange}
                name="file"
                // sx={{ height: "fit-content" }}
                // variant="outlined"
              />
            </Box>
            <Box sx={{ my: 3, display: 'flex' }}>
              <TextField
                sx={{ flexGrow: 1 }}
                defaultValue={professional.profession}
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
                defaultValue={professional.yearsOfExp}
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
                renderValue={(selected) => (
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
              {fieldWatch.bio !== userData?.general?.bio && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                  <Button variant="text" onClick={() => setValue('bio', userData?.general?.bio)}>
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
