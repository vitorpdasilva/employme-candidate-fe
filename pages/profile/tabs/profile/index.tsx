import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Icon, SemanticICONS } from "semantic-ui-react"
import { countriesList, professionList } from "src/constants"
import { useAuthStore } from "src/stores"

type Social = {
  name: SemanticICONS
  url: string
}

export const Profile = () => {
  const userData = useAuthStore((state: any) => state.user)

  if (!userData) return <>Loading...</>

  const { professionalOverview, general, social } = userData
  const selectedRoles = professionList
    .filter((profession) => {
      return professionalOverview?.preferenceToWork?.includes(profession.value)
    })
    .map((role) => role.text)

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

      <Grid sx={{ my: 3 }} container spacing={0}>
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

      <Divider />

      <Grid sx={{ my: 3 }} container spacing={0}>
        <Grid item xs={3}>
          Social
        </Grid>
        <Grid item xs={6}>
          {social.map(({ name, url }: Social) => (
            <TextField
              margin="normal"
              key={name}
              label={name}
              fullWidth
              value={url}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name={name} />
                  </InputAdornment>
                ),
              }}
            />
          ))}
        </Grid>
      </Grid>

      <Divider />

      <Grid sx={{ my: 3 }} container spacing={0}>
        <Grid item xs={3}>
          Your work experience
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    variant="square"
                    src="https://photos.angel.co/startups/i/4634051-16164880183cfb651e472aafce896328-medium_jpg.jpg?buster=1589648733"
                    sx={{ mr: 1 }}
                  >
                    Rivian
                  </Avatar>
                  <Box>
                    <Typography>Senior Front End Developer</Typography>
                    <Link target="_blank" href="https://rivian.com">
                      Rivian
                    </Link>
                    <Box sx={{ textAlign: "justify" }}>
                      responsible for designing and developing the user
                      interface of a website or web application. This involves
                      using a combination of programming languages, such as
                      HTML, CSS, and JavaScript, to create visually appealing
                      and functional layouts that are responsive to different
                      devices and screen sizes. The front-end developer works
                      closely with the design team to ensure that the final
                      product matches the intended look and feel, and may also
                      collaborate with back-end developers to integrate the
                      front-end components with server-side technologies. In
                      addition to technical skills, a front-end developer must
                      have an eye for design, be able to work under tight
                      deadlines, and be comfortable with continuous learning and
                      adaptation to new tools and technologies.
                    </Box>
                  </Box>
                </Box>
              </Paper>
              + Add work experience
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
