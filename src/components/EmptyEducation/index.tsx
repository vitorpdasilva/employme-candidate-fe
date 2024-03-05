import { Box, Button, Paper, TextField } from '@mui/material'
import { useFetchApi } from 'client'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { userStore } from '~/stores'
type FormFields = {
  school: string
  degree: string
  fieldOfStudy: string
  startDate: Date
  endDate: Date
  description: string
}

type EmptyEducationProps = {
  onFinish: () => void
}

export const EmptyEducation = ({ onFinish }: EmptyEducationProps): JSX.Element => {
  const { fetchApi } = useFetchApi()
  const { enqueueSnackbar } = useSnackbar()
  const userData = userStore((state) => state.user)
  const setUserStore = userStore((state) => state.setUser)

  const { handleSubmit, register } = useForm<FormFields>({
    defaultValues: {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: new Date(),
      endDate: new Date(),
      description: '',
    },
  })

  const onSubmit = async (formFields: FormFields): Promise<void> => {
    const requestData = {
      id: userData?.id,
      username: userData?.username,
      ...userData,
      education: [...(userData?.education ?? ''), formFields],
    }

    try {
      const { user: updatedUser } = await fetchApi({
        url: '/user',
        method: 'PATCH',
        body: requestData,
      })
      setUserStore(updatedUser)
      onFinish()
      enqueueSnackbar('Education added', { variant: 'success' })
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
          label="School Name *"
          fullWidth
          {...register('school', { required: true })}
        />
        <TextField size="small" margin="dense" label="Degree" fullWidth {...register('degree')} />
        <TextField size="small" margin="dense" label="Field of Study" fullWidth {...register('fieldOfStudy')} />

        <TextField
          type="date"
          size="small"
          margin="dense"
          fullWidth
          inputProps={{ shrink: true, inputMode: 'numeric' }}
          label="Start Date"
          {...register('startDate')}
        />

        <TextField
          type="date"
          size="small"
          margin="dense"
          fullWidth
          defaultValue={new Date()}
          inputProps={{ shrink: true, inputMode: 'numeric' }}
          label="End Date"
          {...register('endDate')}
        />

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
