import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"

import { companySizes, CompanySizes } from "src/constants"

const radios = [
  { value: 1, label: "Ideal" },
  { value: 2, label: "Yes" },
  { value: 3, label: "No" },
]

export const Preferences = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            What is your desired salary?
          </Typography>
          <Typography variant="subtitle2">
            Let companies know how much you would like to earn annually.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="normal"
            defaultValue={0}
            variant="outlined"
            label="70,000"
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            Would you like to work at companies of these sizes?
          </Typography>
        </Grid>
        <Grid item xs={9}>
          {companySizes.map(({ value, label }: CompanySizes) => (
            <FormControl
              key={value}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormLabel sx={{ width: "30%" }}>{label}</FormLabel>
              <RadioGroup row name={`companySizes-${value}`}>
                {radios.map((radio) => (
                  <FormControlLabel
                    key={radio.value}
                    value={radio.value}
                    control={<Radio />}
                    label={radio.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
