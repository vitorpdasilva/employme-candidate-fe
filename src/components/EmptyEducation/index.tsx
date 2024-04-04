import { Box, Button, Paper, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Controller, useForm } from 'react-hook-form'
import { UpdateUserInputDto, useOnUpdateUser } from '~/queries'
import { userStore } from '~/stores'
type FormFields = {
  school: string
  degree: string
  fieldOfStudy: string
  startDate: Date | null
  endDate: Date | null
  description: string
}

type EmptyEducationProps = {
  onFinish: () => void
}

export const EmptyEducation = ({ onFinish }: EmptyEducationProps): JSX.Element => {
  const userData = userStore((state) => state.user)
  const { onUpdateUser, loading } = useOnUpdateUser()

  const { handleSubmit, register, control, setValue } = useForm<FormFields>({
    defaultValues: {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: null,
      endDate: null,
      description: '',
    },
  })

  const onSubmit = async (formFields: FormFields): Promise<void> => {
    const requestData = {
      education: [...(userData?.education ?? ''), formFields],
    }
    onUpdateUser({ data: requestData as Partial<UpdateUserInputDto> })
    onFinish()
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
        <TextField size="small" margin="dense" label="Degree *" fullWidth {...register('degree', { required: true })} />
        <TextField size="small" margin="dense" label="Field of Study" fullWidth {...register('fieldOfStudy')} />

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
                label="Start Date *"
                onChange={(date): void => {
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
                label="End Date *"
                onChange={(date): void => {
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
          <Button disabled={loading} variant="text" onClick={onFinish}>
            Cancel
          </Button>
          <Button disabled={loading} variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  )
}
