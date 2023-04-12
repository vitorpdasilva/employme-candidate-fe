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
import { fetchApi } from "client"
import { useDebounce } from "hooks/useDebounce"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import { useAuthStore } from "stores/auth"
type LookingFor = {
  name: string
  values: {
    lookingFor: string
  }
}

type RequestData = {
  name: string
  values: {} | []
}

export const Culture = () => {
  const [lookingFor, setLookingFor] = useState<LookingFor>({
    name: "culture",
    values: {
      lookingFor: "",
    },
  })

  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  console.log({ userData })

  useDebounce(() => onSubmit(lookingFor), 700, [lookingFor])
  const onSubmit = async (data: RequestData) => {
    const requestData = {
      ...userData,
      culture: {
        ...userData.culture,
        ...data.values,
      },
    }
    console.log({ requestData })
    try {
      const { user: updatedUser, token } = await fetchApi({
        url: "/user",
        method: "PATCH",
        body: requestData,
      })
      setUserStore(updatedUser, token)
      enqueueSnackbar("Culture preferences updated", {
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
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            Describe what you are looking for in your next job
          </Typography>
          <Typography variant="subtitle2">
            Startups tell us this is one of the first things they look at in a profile.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            defaultValue={userData.culture?.lookingFor ?? "alow alow"}
            fullWidth
            multiline
            onChange={(e) => {
              const { value } = e.target
              setLookingFor({
                name: "lookingFor",
                values: { lookingFor: value },
              })
            }}
          />
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
                checked={true}
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
                checked={true}
              />
              <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">What environment do you work better in?</Typography>
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
                checked
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}
