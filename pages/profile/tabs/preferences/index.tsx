import {
  Box,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { fetchApi } from "client"
import { useSnackbar } from "notistack"
import { NumericInput } from "src/components"
import type { CompanySizes } from "src/constants"
import { companySizes, currencyList, jobSearchStatus } from "src/constants"
import { useAuthStore } from "stores/auth"

type FormFieldsValues = {
  value: number
  name: string
}

const radios = [
  { value: 1, label: "Ideal" },
  { value: 2, label: "Yes" },
  { value: 3, label: "No" },
]

export const Preferences = () => {
  const { enqueueSnackbar } = useSnackbar()

  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  const onSubmit = async (data: FormFieldsValues) => {
    const requestData = {
      id: userData.id,
      username: userData.username,
      ...userData,
      preferences: {
        ...userData.preferences,
        [data.name]: {
          id: data.value,
          label: jobSearchStatus.filter((item) => item.value === data.value)[0].label,
        },
      },
    }
    try {
      const { user: updatedUser, token } = await fetchApi({
        url: "/user",
        method: "PATCH",
        body: requestData,
      })
      setUserStore(updatedUser, token)
      enqueueSnackbar("Preferences updated", {
        variant: "success",
      })
    } catch (err) {
      enqueueSnackbar("Something went wrong", { variant: "error" })
      console.error({ err })
    }
  }

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Where are you in your job search?</Typography>
          <Typography variant="subtitle2">
            Your current company will never see that you are looking for a job, no matter what you
            choose
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            name="jobSearchStatus"
            select
            fullWidth
            defaultValue={userData.preferences?.jobSearchStatus?.id ?? 0}
            onChange={(e) => onSubmit({ name: e.target.name, value: Number(e.target.value) })}
          >
            {jobSearchStatus.map(({ value, label }) => (
              <MenuItem key={value} value={value} aria-label={label}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">What is your desired salary?</Typography>
          <Typography variant="subtitle2">
            Let companies know how much you would like to earn annually.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9} spacing={2} sx={{ display: "flex", gap: "20px" }}>
          <TextField
            select
            label="Currency"
            defaultValue={0}
            variant="outlined"
            sx={{ flexGrow: 1 }}
          >
            {currencyList.map((currency: any) => (
              <MenuItem key={currency.value} value={currency.value} aria-label={currency.name}>
                {currency.name} - {currency.symbol}
              </MenuItem>
            ))}
          </TextField>
          {/* <NumericInput onChange={(e) => console.log({ e: e.target })} /> */}
          <TextField
            label="Salary"
            InputProps={{
              inputComponent: NumericInput as any,
            }}
            variant="outlined"
          />

          <TextField label="Periodicity" select defaultValue={0} variant="outlined">
            <MenuItem value={0}>Per Year</MenuItem>
            <MenuItem value={1}>Per Month</MenuItem>
            <MenuItem value={2}>Per Week</MenuItem>
            <MenuItem value={3}>Per Hour</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">
            Would you like to work at companies of these sizes?
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
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
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Hide your profile from select companies</Typography>
          <Typography variant="subtitle2">
            Recruiters from the companies you select won’t see your profile in a candidate search.
            Your current and past employers are hidden by default.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack direction="row" spacing={2}>
            <Chip label="Company 1" onDelete={() => console.log("deleting company 1")} />
            <Chip label="Company 2" onDelete={() => console.log("deleting company 2")} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
