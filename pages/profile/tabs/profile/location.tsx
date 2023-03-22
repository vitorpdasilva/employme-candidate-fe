import { Grid, MenuItem, TextField } from "@mui/material"
import { fetchApi } from "client"
import { useForm } from "react-hook-form"
import { countriesList } from "src/constants"
import type { CountriesList } from "src/types"
import { useAuthStore } from "stores/auth"

type FormFields = {
  currentLocation: string;
};
export const Location = () => {
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)
  console.log({ userData })
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      currentLocation: userData?.general?.currentLocation,
    },
  })

  const handleChange = async (data: any) => {
    console.log({ data })
    const requestData = {
      id: userData.id,
      username: userData.username,
      general: {
        currentLocation: data.general.currentLocation,
      },
    }
    const { user: updatedUser, token } = await fetchApi({
      url: "/user",
      method: "PATCH",
      body: requestData,
    })
    setUserStore(updatedUser, token)
  }

  return (
    <form onChange={handleSubmit(handleChange)}>
      <Grid sx={{ my: 3 }} container spacing={0}>
        <Grid item xs={12} md={3}>
          Locations
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            select
            margin="normal"
            fullWidth
            label="Where are you currently located?"
            {...register("currentLocation")}
          >
            {countriesList.map((country: CountriesList) => (
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
