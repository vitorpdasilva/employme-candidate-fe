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
  name: SemanticICONS;
  url: string;
};

export const Profile = () => {
  const userData = useAuthStore((state: any) => state.user)

  if (!userData) return <>Loading...</>

  const { professionalOverview, general, social, education } = userData
  const selectedRoles = professionList
    .filter((profession) => {
      return professionalOverview?.preferenceToWork?.includes(profession.value)
    })
    .map((role) => role.text)

  console.log({ userData })

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">About</Typography>
          <Typography variant="subtitle2">
            Tell us about yourself so startups know who you are.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
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
                <MenuItem key={profession.text as string} value={profession?.value}>
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
            <InputLabel id="demo-multiple-checkbox-label">Open for the following roles</InputLabel>
            <Select
              label="Open for the following roles"
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-chip"
              fullWidth
              multiple
              value={selectedRoles}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
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
            <TextField fullWidth multiline rows={4} label="Your Bio" defaultValue={general.bio} />
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
                {professionalOverview?.workExperience?.map((experience: any) => (
                  <Box key={experience.company} sx={{ display: "flex" }}>
                    <Avatar
                      variant="square"
                      src="https://photos.angel.co/startups/i/4634051-16164880183cfb651e472aafce896328-medium_jpg.jpg?buster=1589648733"
                      sx={{ mr: 1 }}
                    >
                      {experience.company}
                    </Avatar>
                    <Box>
                      <Typography>{experience.title}</Typography>
                      <Link target="_blank" href="https://rivian.com">
                        {experience.company}
                      </Link>
                      <Box sx={{ textAlign: "justify" }}>{experience.description}</Box>
                    </Box>
                  </Box>
                ))}
              </Paper>
              <Button variant="text">+ Add work experience</Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid sx={{ my: 3 }} container spacing={0}>
        <Grid item xs={3}>
          Education
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <Paper sx={{ p: 2 }}>
                {education.map((item: any) => (
                  <Box key={item.degree} sx={{ display: "flex" }}>
                    <Avatar
                      variant="square"
                      src="https://photos.angel.co/startups/i/4634051-16164880183cfb651e472aafce896328-medium_jpg.jpg?buster=1589648733"
                      sx={{ mr: 1 }}
                    >
                      {item.school}
                    </Avatar>
                    <Box>
                      <Typography>{item.school}</Typography>
                      <Link target="_blank" href="https://senac.com.br">
                        {item.fieldOfStudy}
                      </Link>
                      <Box sx={{ textAlign: "justify" }}>{item.description}</Box>
                    </Box>
                  </Box>
                ))}
              </Paper>
              <Button variant="text">+ Add Education</Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
