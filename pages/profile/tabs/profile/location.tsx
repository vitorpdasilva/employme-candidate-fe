import { Grid, MenuItem, TextField } from '@mui/material'
import { countriesList } from '~/constants'
import { userStore } from '~/stores'
import { UpdateUserInputDto, useOnUpdateUser } from '~/queries'

export const Location = (): JSX.Element => {
  const { onCall } = useOnUpdateUser()

  const user = userStore((state) => state.user)

  const handleChange = async (data: string): Promise<void> => {
    const requestData = {
      general: {
        ...user?.general,
        currentLocation: data,
      },
    }
    onCall({ data: requestData as Partial<UpdateUserInputDto> })
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
            onChange={(e): Promise<void> => handleChange(e.target.value)}
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
