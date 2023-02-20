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
} from "@mui/material"
import { countriesList, professionList } from "src/constants"
import { useAuthStore } from "src/stores"

export const Profile = () => {
  const userData = useAuthStore((state: any) => state.user) ?? []
  const { professionalOverview, general } = userData
  if (!userData) return <>Loading...</>
  const selectedRoles = professionList
    .filter((profession) => {
      return professionalOverview?.preferenceToWork?.includes(profession.value)
    })
    .map((role) => role.text)
  console.log({ userData })

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">About</Typography>
          <Typography variant="subtitle2">
            Tell us about yourself so startups know who you are.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            value={userData?.name}
            variant="outlined"
            label="Your Name"
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={`${userData?.name}'s picture`}
              src={userData?.picture}
              sx={{ width: 56, height: 56, mr: 3 }}
            />
            <Button sx={{ height: "fit-content" }} variant="outlined">
              Upload a new photo
            </Button>
          </Box>
          <Box sx={{ my: 3, display: "flex" }}>
            <TextField
              sx={{ flexGrow: 1 }}
              defaultValue={professionalOverview.profession}
              select
              label="Select your primary role"
            >
              {professionList.map((profession) => (
                <MenuItem
                  key={profession.text as string}
                  value={profession?.value}
                >
                  {profession?.text}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              defaultValue={professionalOverview.yearsOfExp}
              select
              sx={{ width: "35%", ml: 3 }}
              label="Years of Experience"
            >
              {[...Array(10).keys()].map((year) => (
                <MenuItem key={year} value={year}>
                  {year} {year !== 1 ? "years" : "year"}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Open for the following roles
            </InputLabel>
            <Select
              label="Open for the following roles"
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-chip"
              fullWidth
              multiple
              value={selectedRoles}
              renderValue={(selected) => (
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}
                >
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
            <TextField fullWidth multiline rows={4} label="Your Bio" />
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid sx={{ mt: 3 }} container spacing={0}>
        <Grid item xs={3}>
          Locations
        </Grid>
        <Grid item xs={6}>
          <TextField
            defaultValue={general?.currentLocation}
            select
            fullWidth
            label="Where are you currently located?"
          >
            {countriesList.map((country) => (
              <MenuItem key={country?.name} value={country?.code}>
                {country?.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  )
}
