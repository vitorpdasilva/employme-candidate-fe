import {
  Box,
  Divider,
  Grid,
  InputBaseComponentProps,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material'
import { ChangeEvent, ElementType, useState } from 'react'
import { NumericInput } from '~/components'
import type { CurrencyList } from '~/constants'
import { currencyList, jobSearchStatus } from '~/constants'
import { useDebounce } from '~/hooks'
import { userStore } from '~/stores'
import { useOnUpdateUser, UpdateUserInputDto } from '~/queries'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

type TemporaryFakeCompany = {
  id: string
  name: string
}

const fakeCompaniesList: TemporaryFakeCompany[] = Array.from({ length: 50 }, () => ({
  id: uuidv4(),
  name: faker.company.name(),
}))

export const Preferences = (): JSX.Element => {
  const { onUpdateUser, loading } = useOnUpdateUser()
  const [companiesMatchingHideInput, setCompaniesMatchingHideInput] = useState<TemporaryFakeCompany[]>([])

  const user = userStore((state) => state.user)

  console.log({ fakeCompaniesList })

  const onSubmit = async (data: object): Promise<void> => {
    const requestData = {
      preferences: {
        ...user?.preferences,
        ...data,
      },
    }

    onUpdateUser({ userId: user?.id ?? '', data: requestData as Partial<UpdateUserInputDto> })
  }

  const findCompany = (input: string): void => {
    const matchingCompanies = fakeCompaniesList.filter((company) =>
      company.name.toLowerCase().includes(input.toLowerCase())
    )
    setCompaniesMatchingHideInput(matchingCompanies)
  }

  const debouncedSubmit = useDebounce(onSubmit, 800)
  const debouncedCompanyFind = useDebounce(findCompany, 500)

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
            <Autocomplete
              multiple
              limitTags={2}
              options={companiesMatchingHideInput.map((company) => company.name)}
              getOptionLabel={(option): string => option}
              defaultValue={user?.preferences?.hideFromCompanies ?? []}
              onInput={(e: ChangeEvent<HTMLInputElement>): void => debouncedCompanyFind(e.target.value)}
              onChange={(_: unknown, values: string[]): void => {
                onSubmit({
                  hideFromCompanies: [...values],
                })
                setCompaniesMatchingHideInput([])
              }}
              disabled={loading}
              renderInput={(params): JSX.Element => (
                <TextField {...params} placeholder="Your company will be hidden for employees of these companies" />
              )}
              sx={{ width: '500px' }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
