import { userStore } from '@/stores'
import { Grid, MenuItem, TextField } from '@mui/material'
import { fetchApi } from 'client'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { countriesList } from 'src/constants'

type FormFields = {
  currentLocation: string
}
export const Location = () => {
  const user = userStore((state: any) => state.user)
  const setUserStore = userStore((state: any) => state.setUser)
  const { enqueueSnackbar } = useSnackbar()

  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      currentLocation: user?.general?.currentLocation,
    },
  })

  const handleChange = async (data: any) => {
    const requestData = {
      id: user.id,
      username: user.username,
      general: {
        ...user.general,
        currentLocation: data.currentLocation,
      },
    }
    try {
      const { user: updatedUser, token } = await fetchApi({
        url: '/user',
        method: 'PATCH',
        body: requestData,
      })
      setUserStore(updatedUser, token)
      enqueueSnackbar('Location updated', { variant: 'success' })
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
      console.error({ e })
    }
  }

  return (
    <form>
      <Grid sx={{ my: 3 }} container spacing={0}>
        <Grid item xs={12} md={3}>
          Location
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            select
            margin="normal"
            fullWidth
            defaultValue={user?.general?.currentLocation}
            label="Where are you currently located?"
            inputProps={register('currentLocation')}
            onChange={handleSubmit(handleChange)}
          >
            {countriesList.map((country) => (
              <MenuItem key={country?.name} value={country.code}>
                {country?.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </form>
  )
}
