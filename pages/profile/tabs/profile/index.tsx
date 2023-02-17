import { Box, Grid, Typography, TextField, Avatar, Button, MenuItem } from '@mui/material'
import { useAuthStore } from "src/stores";
import { professionList } from "src/constants";

export const Profile = () => {
  const userData = useAuthStore((state: any) => state.user);
  console.log({ userData })
  if (!userData) return <>Loading...</>;
  return (
    <Box sx={{ flexGrow: 1, width: '100%', height: '1000px' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant='subtitle1'>About</Typography>
          <Typography variant="subtitle2">Tell us about yourself so startups know who you are.</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth margin='normal' value={userData?.name} variant='outlined' label="Your Name" />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={`Picture of ${userData?.name}`} src={userData?.picture} sx={{ width: 56, height: 56, mr: 3 }} />
            <Button sx={{ height: 'fit-content' }} variant='outlined'>Upload a new photo</Button>
          </Box>
          <Box>
            <TextField select label="Select your primary role">
              <MenuItem value="Developer">Developer</MenuItem>
              {professionList.map((profession) => (
                <MenuItem key={profession.text as string} value={profession?.text}>
                  {profession?.text}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Years of Experience" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}