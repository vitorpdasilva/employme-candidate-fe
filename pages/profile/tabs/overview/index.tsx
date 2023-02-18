import { Box } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

export const Overview = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          left column
        </Grid>
        <Grid xs={8}>
          main column
        </Grid>
      </Grid>
    </Box>
  )
}
