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
} from '@mui/material'
import { useFetchApi } from 'client'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDebounce } from '~/hooks'
import { userStore } from '~/stores'

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
  const { fetchApi } = useFetchApi()
  const [lookingFor, setLookingFor] = useState<LookingFor>({
    name: 'culture',
    values: {
      lookingFor: '',
    },
  })

  const user = userStore((state: any) => state.user)
  const setUserStore = userStore((state: any) => state.setUser)

  useDebounce(() => onSubmit(lookingFor), 700, [lookingFor])
  const onSubmit = async (data: RequestData) => {
    const requestData = {
      ...user,
      culture: {
        ...user.culture,
        ...data.values,
      },
    }

    try {
      const { user: updatedUser, token } = await fetchApi({
        url: '/user',
        method: 'PATCH',
        body: requestData,
      })
      setUserStore(updatedUser, token)
      enqueueSnackbar('Culture preferences updated', {
        variant: 'success',
      })
    } catch (err) {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
      console.error({ err })
    }
  }
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Describe what you are looking for in your next job</Typography>
          <Typography variant="subtitle2">
            Startups tell us this is one of the first things they look at in a profile.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            defaultValue={user.culture?.lookingFor ?? 'alow alow'}
            fullWidth
            multiline
            onChange={(e) => {
              const { value } = e.target
              setLookingFor({
                name: 'lookingFor',
                values: { lookingFor: value },
              })
            }}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">What motivates you more?</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <FormControl>
            <RadioGroup
              aria-labelledby="motivates-me-more"
              name="motivates-me-more"
              defaultValue={user.culture.motivatesMeMore}
              onChange={(e) => {
                const { value } = e.target
                onSubmit({
                  name: 'motivatesMeMore',
                  values: { motivatesMeMore: Number(value) },
                })
              }}
            >
              <FormControlLabel value={0} control={<Radio />} label="Solving technical problems" />
              <FormControlLabel value={1} control={<Radio />} label="Building products" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">
            Over the next five years, what career track do you want to follow?
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl>
            <RadioGroup
              aria-labelledby="five-years-career-track"
              name="five-years-career-track"
              defaultValue={user.culture.fiveYearsCareerTrack}
              onChange={(e) => {
                const { value } = e.target
                onSubmit({
                  name: 'fiveYearsCareerTrack',
                  values: { fiveYearsCareerTrack: Number(value) },
                })
              }}
            >
              <FormControlLabel value={0} control={<Radio />} label="Individual contributor" />
              <FormControlLabel value={1} control={<Radio />} label="Manager" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">What environment do you work better in?</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <FormControl>
            <RadioGroup
              aria-labelledby="work-better-in"
              name="work-better-in"
              value={user.culture.workBetterIn}
              onChange={(e) => {
                const { value } = e.target
                onSubmit({
                  name: 'workBetterIn',
                  values: { workBetterIn: Number(value) },
                })
              }}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Clear role and set of responsibilities. Consistent feedback from management."
              />
              <FormControlLabel
                value={1}
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
