import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { fetchApi } from "client"
import { useForm } from "react-hook-form"
import { professionList } from "src/constants"
import { useAuthStore } from "src/stores"
import { Location } from "./location"
import { Social } from "./social"

type FormFields = {
  name: string;
  bio: string;
  currentLocation: string;
};
export const Profile = () => {
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  const { register, handleSubmit, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      name: userData?.name,
      bio: userData?.general.bio,
    },
  })

  const fieldWatch = watch()

  if (!userData) return <>Loading...</>

  const { professionalOverview, education } = userData
  const selectedRoles = professionList
    .filter((profession) => {
      return professionalOverview?.preferenceToWork?.includes(profession.value)
    })
    .map((role) => role.text)

  const handleChange = async (data: FormFields) => {
    console.log({ data })
    const requestData = {
      id: userData.id,
      username: userData.username,
      name: data.name,
      general: {
        ...userData.general,
        bio: data.bio,
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
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <form onSubmit={handleSubmit(handleChange)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1">About</Typography>
            <Typography variant="subtitle2">
              Tell us about yourself so startups know who you are.
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Your Name"
              {...register("name")}
              onChange={(e) => setValue("name", e.target.value)}
            />
            {fieldWatch.name !== userData?.name && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="text" onClick={() => setValue("name", userData?.name)}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            )}

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
              <TextField fullWidth multiline rows={4} label="Your Bio" {...register("bio")} />
              {fieldWatch.bio !== userData?.general.bio && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
                  <Button variant="text" onClick={() => setValue("bio", userData?.general.bio)}>
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

      <Grid sx={{ my: 3 }} container spacing={0}>
        <Grid item xs={12} md={3}>
          Your work experience
        </Grid>
        <Grid item xs={12} md={9}>
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
        <Grid item xs={12} md={3}>
          Education
        </Grid>
        <Grid item xs={12} md={9}>
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
