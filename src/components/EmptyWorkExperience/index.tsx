import { Box, Button, Paper, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
type EmptyWorkExperienceProps = {
  onFinish: () => void
}

type FormFields = {
  companyName: string
  title: string
  startDate: string
  endDate: string
  description: string
}

export const EmptyWorkExperience = ({ onFinish }: EmptyWorkExperienceProps) => {
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      companyName: "",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  })

  const onSubmit = (formFields: FormFields) => {
    console.log({ formFields })
  }

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <TextField
          size="small"
          margin="dense"
          label="Company Name *"
          fullWidth
          {...register("companyName", { required: true })}
        />
        <TextField size="small" margin="dense" label="Title" fullWidth {...register("title")} />
        <TextField
          size="small"
          margin="dense"
          label="Start Date *"
          fullWidth
          {...register("startDate", { required: true })}
        />
        <TextField
          size="small"
          margin="dense"
          label="End Date *"
          fullWidth
          {...register("endDate", { required: true })}
        />
        <TextField
          size="small"
          margin="dense"
          label="Description *"
          fullWidth
          multiline
          rows={4}
          {...register("description", { required: true })}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
