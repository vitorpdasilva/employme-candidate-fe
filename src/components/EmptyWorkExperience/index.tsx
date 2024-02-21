import { Box, Button, Paper, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useFetchApi } from 'client'
import { useSnackbar } from 'notistack'
import { Controller, useForm } from 'react-hook-form'
import { userStore } from 'src/stores'
import { v4 as uuidv4 } from 'uuid'
type EmptyWorkExperienceProps = {
  onFinish: () => void
}

type FormFields = {
  company: string
  title: string
  location: string
  startDate: Date | null
  endDate: Date | null
  description: string
}

export const EmptyWorkExperience = ({ onFinish }: EmptyWorkExperienceProps): JSX.Element => {
  const { fetchApi } = useFetchApi()
  const { enqueueSnackbar } = useSnackbar()
  const userData = userStore((state: any) => state.user)
  const setUserStore = userStore((state: any) => state.setUser)

  const { register, handleSubmit, control, formState, setValue } = useForm<FormFields>({
    defaultValues: {
      company: '',
      title: '',
      location: '',
      startDate: null,
      endDate: null,
      description: '',
    },
  })

  console.log({ formState })

  const onSubmit = async (formFields: FormFields): Promise<void> => {
    const requestData = {
      id: userData.id,
      username: userData.username,
      ...userData,
      professional: {
        id: uuidv4(),
        ...userData.professional,
        workExperience: [...userData.professional.workExperience, formFields],
      },
    }
    console.log({ formFields, requestData })
    try {
      const { user: updatedUser, token } = await fetchApi({
        url: '/user',
        method: 'PATCH',
        body: requestData,
      })
      setUserStore(updatedUser, token)
      onFinish()
      enqueueSnackbar('Work Experience added', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
      console.error({ err })
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <TextField
          size="small"
          margin="dense"
          label="Company Name *"
          fullWidth
          {...register('company', { required: true })}
        />
        <TextField size="small" margin="dense" label="Title" fullWidth {...register('title', { required: true })} />

        <TextField
          size="small"
          margin="dense"
          label="Location"
          fullWidth
          {...register('location', { required: true })}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            mt: '10px',
            mb: '5px',
          }}
        >
          <Controller
            control={control}
            name="startDate"
            rules={{ required: true }}
            render={(): JSX.Element => (
              <DatePicker
                sx={{ flexGrow: 1 }}
                disableFuture
                formatDensity="dense"
                label="Start Date"
                onChange={(date): void => {
                  console.log({ date })
                  setValue('startDate', date as Date)
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="endDate"
            rules={{ required: true }}
            render={(): JSX.Element => (
              <DatePicker
                sx={{ flexGrow: 1 }}
                disableFuture
                formatDensity="dense"
                label="End Date"
                onChange={(date): void => {
                  console.log({ date })
                  setValue('endDate', date as Date)
                }}
              />
            )}
          />
        </Box>

        <TextField
          size="small"
          margin="dense"
          label="Description *"
          fullWidth
          multiline
          rows={4}
          {...register('description', { required: true })}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="text" onClick={onFinish}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  )
}
