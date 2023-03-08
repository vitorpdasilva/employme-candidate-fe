import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"

export const Culture = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            Describe what you are looking for in your next job
          </Typography>
          <Typography variant="subtitle2">
            Startups tell us this is one of the first things they look at in a
            profile.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField defaultValue={0} fullWidth multiline />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">What motivates you more?</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={0}
              onChange={() => console.log("changed")}
            >
              <FormControlLabel
                value="Solving technical problems"
                control={<Radio />}
                label="Solving technical problems"
              />
              <FormControlLabel
                value="Building products"
                control={<Radio />}
                label="Building products"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            Over the next five years, what career track do you want to follow?
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={0}
              onChange={() => console.log("changed")}
            >
              <FormControlLabel
                value="Individual contributor"
                control={<Radio />}
                label="Individual contributor"
              />
              <FormControlLabel
                value="Manager"
                control={<Radio />}
                label="Manager"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            What environment do you work better in?
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={0}
              onChange={() => console.log("changed")}
            >
              <FormControlLabel
                value="Clear role and set of responsibilities. Consistent feedback from management."
                control={<Radio />}
                label="Clear role and set of responsibilities. Consistent feedback from management."
              />
              <FormControlLabel
                value={`Employees wear a lot of hats. Assignments often require employees 
                to 'figure it out' on their own.`}
                control={<Radio />}
                label={`Employees wear a lot of hats. Assignments often require employees 
                to 'figure it out' on their own.`}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}
