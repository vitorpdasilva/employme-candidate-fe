import { Box, Button, Paper, TextField } from "@mui/material"
import { fetchApi } from "client"
import { useForm } from "react-hook-form"
import { useAuthStore } from "stores/auth"

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

export const EmptyEducation = ({ onFinish }: EmptyEducationProps) => {
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  const { handleSubmit, register } = useForm<FormFields>({
    defaultValues: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
    },
  })

  const onSubmit = async (formFields: FormFields) => {
    const requestData = {
      id: userData.id,
      username: userData.username,
      ...userData,
      education: [...userData.education, formFields],
    }

    const { user: updatedUser, token } = await fetchApi({
      url: "/user",
      method: "PATCH",
      body: requestData,
    })
    setUserStore(updatedUser, token)
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
          {...register("school", { required: true })}
        />
        <TextField size="small" margin="dense" label="Degree" fullWidth {...register("degree")} />
        <TextField
          size="small"
          margin="dense"
          label="Field of Study"
          fullWidth
          {...register("fieldOfStudy")}
        />

        <TextField
          type="date"
          size="small"
          margin="dense"
          fullWidth
          inputProps={{ shrink: true, inputMode: "numeric" }}
          label="Start Date"
          {...register("startDate")}
        />

        <TextField
          type="date"
          size="small"
          margin="dense"
          fullWidth
          defaultValue={new Date()}
          inputProps={{ shrink: true, inputMode: "numeric" }}
          label="End Date"
          {...register("endDate")}
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
