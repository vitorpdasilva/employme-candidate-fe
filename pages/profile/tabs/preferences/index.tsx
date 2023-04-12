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
import { useState } from "react"
import { NumericInput } from "src/components"
import type { CompanySizes, CurrencyList } from "src/constants"
import { companySizes, currencyList, jobSearchStatus } from "src/constants"
import { useDebounce } from "src/hooks"
import { useAuthStore } from "stores/auth"

const radios: Record<string, string | number>[] = [
  { value: 1, label: "Ideal" },
  { value: 2, label: "Yes" },
  { value: 3, label: "No" },
]

export const Preferences = () => {
  const [salaryObj, setSalaryObj] = useState<any>(0)
  const { enqueueSnackbar } = useSnackbar()

  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  useDebounce(() => onSubmit(salaryObj), 1000, [salaryObj])

  const onSubmit = async (data: any) => {
    const requestData = {
      id: userData.id,
      username: userData.username,
      ...userData,
      preferences: {
        ...userData.preferences,
        [data.name]: Array.isArray(userData.preferences?.[data.name])
          ? [...(userData.preferences?.[data.name] as any), data.values]
          : {
            ...userData.preferences?.[data.name],
            ...data.values,
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
            select
            fullWidth
            defaultValue={userData.preferences?.jobSearchStatus?.id ?? 0}
            onChange={(e) =>
              onSubmit({
                name: "jobSearchStatus",
                values: {
                  id: e.target.value,
                  label: jobSearchStatus.filter((item) => item.value === Number(e.target.value))[0]
                    .label,
                },
              })
            }
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
            variant="outlined"
            sx={{ flexGrow: 1 }}
            defaultValue={userData.preferences?.salary?.currency ?? 0}
            onChange={(e) =>
              onSubmit({
                name: "salary",
                values: {
                  currency: e.target.value,
                },
              })
            }
          >
            {currencyList.map((currency: CurrencyList) => (
              <MenuItem key={currency.value} value={currency.value} aria-label={currency.name}>
                {currency.name} - {currency.symbol}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Salary"
            InputProps={{
              inputComponent: NumericInput as any,
            }}
            defaultValue={userData.preferences?.salary?.amount ?? ""}
            variant="outlined"
            onChange={(e) => {
              const value = e.target.value
              setSalaryObj({
                name: "salary",
                values: {
                  amount: value,
                },
              })
            }}
          />

          <TextField
            label="Periodicity"
            select
            defaultValue={userData.preferences?.salary?.periodicity ?? 0}
            variant="outlined"
            onChange={(e) =>
              onSubmit({
                name: "salary",
                values: {
                  periodicity: e.target.value,
                },
              })
            }
          >
            <MenuItem value={"Per Year"}>Per Year</MenuItem>
            <MenuItem value={"Per Month"}>Per Month</MenuItem>
            <MenuItem value={"Per Week"}>Per Week</MenuItem>
            <MenuItem value={"Per Hour"}>Per Hour</MenuItem>
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
          {companySizes.map(({ label, name, id }: CompanySizes) => (
            <FormControl
              key={id}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
              onChange={(e: any) =>
                onSubmit({
                  name: "companySize",
                  values: { id, option: e.target.value, label },
                })
              }
            >
              <FormLabel sx={{ width: "30%" }}>{label}</FormLabel>
              <RadioGroup
                row
                name={name as string}
                defaultValue={
                  userData.preferences.companySize.find(
                    (company: CompanySizes) => company.label === label
                  )?.option
                }
              >
                {radios.map((radio) => (
                  <FormControlLabel
                    key={radio.value}
                    value={radio.value}
                    control={<Radio />}
                    label={radio.label}
                    checked={
                      radio.value ===
                      userData.preferences.companySize.find(
                        (company: any) => company.label === label
                      )?.option
                    }
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
