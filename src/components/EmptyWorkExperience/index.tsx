import { Box, Button, Paper, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, useForm } from 'react-hook-form'
import { userStore } from '~/stores'
import { useOnUpdateUser, UpdateUserInput } from '~/queries'
import { v4 as uuidv4 } from 'uuid'
type EmptyWorkExperienceProps = {
  onFinish: () => void
}

type WorkExperienceFieldsType = {
  company: string
  title: string
  location: string
  startDate: Date | null
  endDate: Date | null
  description: string
}

export const EmptyWorkExperience = ({ onFinish }: EmptyWorkExperienceProps): JSX.Element => {
  const { onUpdateUser, loading } = useOnUpdateUser()
  const user = userStore((state) => state.user)
  const { register, handleSubmit, control, setValue } = useForm<WorkExperienceFieldsType>({
    defaultValues: {
      company: '',
      title: '',
      location: '',
      startDate: null,
      endDate: null,
      description: '',
    },
  })

  const onSubmit = async (data: Partial<WorkExperienceFieldsType>): Promise<void> => {
    const requestData = {
      professional: {
        ...user?.professional,
        workExperience: [
          {
            id: uuidv4(),
            company: data.company,
            title: data.title,
            location: data.location,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
          },
        ],
      },
    }
    onUpdateUser({ data: requestData as unknown as Partial<UpdateUserInput['data']> })
    onFinish()
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
          label="Location *"
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
