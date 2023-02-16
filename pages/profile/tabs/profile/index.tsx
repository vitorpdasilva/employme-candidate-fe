import { Box, Grid, Typography } from '@mui/material'

export const Profile = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid xs={4}>
          <Typography variant='subtitle1'>About</Typography>
          <Typography variant="subtitle2">Tell us about yourself so startups know who you are.</Typography>
        </Grid>
        <Grid xs={8}>
          main column
        </Grid>
      </Grid>
    </Box>
  )
}