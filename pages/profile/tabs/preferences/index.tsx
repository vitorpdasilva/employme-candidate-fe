import {
  Box,
  Divider,
  Grid,
  InputBaseComponentProps,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Chip,
} from '@mui/material'
import { ElementType } from 'react'
import { NumericInput } from '~/components'
import type { CurrencyList } from '~/constants'
import { currencyList, jobSearchStatus } from '~/constants'
import { useDebounce } from '~/hooks'
import { userStore } from '~/stores'
import { useOnUpdateUser } from '~/queries'
import { components } from '~/types'

type UpdateUserInputDto = components['schemas']['UpdateUserInputDto']

export const Preferences = (): JSX.Element => {
  const { onUpdateUser, loading } = useOnUpdateUser()
  const user = userStore((state) => state.user)

  const onSubmit = async (data: object): Promise<void> => {
    const requestData = {
      preferences: {
        ...user?.preferences,
        ...data,
      },
    }

    onUpdateUser({ userId: user?.id ?? '', data: requestData as Partial<UpdateUserInputDto> })
  }

  const debouncedSubmit = useDebounce(onSubmit, 800)
  if (!user) return <Typography variant="h6">Loading...</Typography>
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Where are you in your job search?</Typography>
          <Typography variant="subtitle2">
            Your current company will never see that you are looking for a job, no matter what you choose
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            select
            fullWidth
            defaultValue={user?.preferences?.jobSearchStatus ?? ''}
            onChange={(e): Promise<void> =>
              onSubmit({
                jobSearchStatus: e.target.value,
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
          <Typography variant="subtitle2">Let companies know how much you would like to earn annually.</Typography>
        </Grid>
        <Grid item xs={12} md={9} sx={{ display: 'flex', gap: '20px' }}>
          <Grid container spacing={1}>
            <Grid item xs={5} md={5}>
              <TextField
                select
                label="Currency"
                variant="outlined"
                sx={{ width: '100%' }}
                defaultValue={user?.preferences?.salary?.currency ?? 0}
                onChange={(e): Promise<void> =>
                  onSubmit({
                    salary: {
                      ...user?.preferences?.salary,
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
            </Grid>
            <Grid item xs={4} md={5}>
              <TextField
                label="Salary"
                InputProps={{
                  inputComponent: NumericInput as unknown as ElementType<InputBaseComponentProps>,
                  defaultValue: user?.preferences?.salary?.amount ?? '99999999999',
                }}
                sx={{ width: '100%' }}
                variant="outlined"
                onChange={(e): void => {
                  const value = e.target.value
                  debouncedSubmit({
                    salary: {
                      ...user?.preferences?.salary,
                      amount: value,
                    },
                  })
                }}
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextField
                label="Periodicity"
                select
                defaultValue={user?.preferences?.salary?.periodicity ?? 0}
                variant="outlined"
                sx={{ width: '100%' }}
                onChange={(e): Promise<void> =>
                  onSubmit({
                    salary: {
                      ...user?.preferences?.salary,
                      periodicity: e.target.value,
                    },
                  })
                }
              >
                <MenuItem value={'Per Year'}>Per Year</MenuItem>
                <MenuItem value={'Per Month'}>Per Month</MenuItem>
                <MenuItem value={'Per Week'}>Per Week</MenuItem>
                <MenuItem value={'Per Hour'}>Per Hour</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />

      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Hide your profile from select companies</Typography>
          <Typography variant="subtitle2">
            Recruiters from the companies you select won’t see your profile in a candidate search. Your current and past
            employers are hidden by default.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Stack direction={'row'} spacing={2}>
              {user?.preferences?.hideFromCompanies.map((company) => (
                <Chip
                  key={company}
                  label={company}
                  onClick={(): void => console.log('redirect to company page')}
                  onDelete={(): Promise<void> =>
                    onSubmit({ hideFromCompanies: user?.preferences?.hideFromCompanies?.filter((c) => c !== company) })
                  }
                />
              ))}
            </Stack>
            <TextField
              select
              disabled={loading}
              fullWidth
              onChange={(e): Promise<void> =>
                onSubmit({
                  hideFromCompanies: [...(user?.preferences?.hideFromCompanies ?? ''), e.target.value],
                })
              }
            >
              <MenuItem value={'Google'}>Google</MenuItem>
              <MenuItem value={'Facebook'}>Facebook</MenuItem>
              <MenuItem value={'Amazon'}>Amazon</MenuItem>
            </TextField>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
