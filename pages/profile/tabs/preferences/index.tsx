import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputBaseComponentProps,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { ChangeEvent, ElementType } from 'react'
import { NumericInput } from '~/components'
import type { CompanySizes, CurrencyList } from '~/constants'
import { companySizes, currencyList, jobSearchStatus } from '~/constants'
import { useDebounce } from '~/hooks'
import { userStore } from '~/stores'
import { onUpdateUser } from '~/queries'
import { useMutation } from '@tanstack/react-query'

const radios: Record<string, string | number>[] = [
  { value: 1, label: 'Ideal' },
  { value: 2, label: 'Yes' },
  { value: 3, label: 'No' },
]

export const Preferences = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const user = userStore((state) => state.user)
  const setUser = userStore((state) => state.setUser)

  const { mutate } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: onUpdateUser,
    onSuccess: (success) => {
      console.log({ success })
      setUser(success.userData)
      enqueueSnackbar('Preferences updated', { variant: 'success' })
    },
  })

  console.log({ user })

  const onSubmit = async (data: object): Promise<void> => {
    const requestData = {
      preferences: {
        ...user?.preferences,
        ...data,
      },
    }
    console.log({ data, requestData, user })
    // todo: figure out how to bypass optional/mandatory fields on the api
    // eslint-disable-next-line
    mutate({ userId: user?.id ?? '', data: requestData as any })
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
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Would you like to work at companies of these sizes?</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          {companySizes.map(({ label, name, id }: CompanySizes) => (
            <FormControl
              key={id}
              sx={{ width: '100%' }}
              onChange={(e: ChangeEvent<HTMLInputElement>): Promise<void> =>
                onSubmit({
                  companySize: e.target.value,
                })
              }
            >
              <Grid container>
                <Grid item xs={12} md={5}>
                  <Typography
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {label}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <RadioGroup row name={name as string} defaultValue={false}>
                    {radios.map((radio) => (
                      <FormControlLabel
                        key={radio.value}
                        value={radio.value}
                        control={<Radio />}
                        label={radio.label}
                        checked={false}
                      />
                    ))}
                  </RadioGroup>
                </Grid>
              </Grid>
            </FormControl>
          ))}
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Hide your profile from select companies</Typography>
          <Typography variant="subtitle2">
            Recruiters from the companies you select won’t see your profile in a candidate search. Your current and past
            employers are hidden by default.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}></Grid>
      </Grid>
    </Box>
  )
}
