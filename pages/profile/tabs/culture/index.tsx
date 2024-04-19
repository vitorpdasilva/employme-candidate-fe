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
import { useDebounce } from '~/hooks'
import { userStore } from '~/stores'
import { useOnUpdateUser, UpdateUserInputDto } from '~/queries'
import { components } from '~/types'

type UpdateCulture = UpdateUserInputDto['culture']
type MotivationType = components['schemas']['MotivationType']
type FiveYearsTrack = components['schemas']['FiveYearsTrack']
type WorkEnvironmentType = components['schemas']['WorkEnvironmentType']

const motivations: MotivationType[] = ['Solving Technical problems', 'Building something from scratch']
const fiveYearsTracks: FiveYearsTrack[] = ['Individual Contributor', 'Manager']
const workEnvironments: WorkEnvironmentType[] = [
  'Clear role and set of responsibilities. Consistent feedback from management',
  'Employees wear a lot of hats. Assignment often require employees to figure it out on their own',
]

export const Culture = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const { onCall } = useOnUpdateUser()

  const onSubmit = async (data: Partial<UpdateCulture>): Promise<void> => {
    const requestData = {
      culture: {
        ...user?.culture,
        ...data,
      },
    }

    onCall({ data: requestData as Partial<UpdateUserInputDto> })
  }

  const debouncedSubmit = useDebounce(onSubmit, 800)

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
            defaultValue={user?.culture?.lookingFor ?? 'alow alow'}
            fullWidth
            multiline
            onChange={(e): void => {
              const { value } = e.target
              debouncedSubmit({ lookingFor: value })
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
              defaultValue={user?.culture?.motivatesMeMore}
              onChange={(e): void => {
                const { value } = e.target
                onSubmit({
                  motivatesMeMore: value as MotivationType,
                })
              }}
            >
              {motivations.map((motivation) => (
                <FormControlLabel key={motivation} value={motivation} control={<Radio />} label={motivation} />
              ))}
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
              defaultValue={user?.culture?.fiveYearsCareerTrack}
              onChange={(e): void => {
                const { value } = e.target
                onSubmit({
                  fiveYearsCareerTrack: value as FiveYearsTrack,
                })
              }}
            >
              {fiveYearsTracks.map((track) => (
                <FormControlLabel key={track} value={track} control={<Radio />} label={track} />
              ))}
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
              value={user?.culture?.workBetterIn}
              onChange={(e): void => {
                const { value } = e.target
                onSubmit({
                  workBetterIn: value as WorkEnvironmentType,
                })
              }}
            >
              {workEnvironments.map((environment) => (
                <FormControlLabel key={environment} value={environment} control={<Radio />} label={environment} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}
