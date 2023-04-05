import { Box, Button, Paper, TextField } from "@mui/material"
import { fetchApi } from "client"

import { useSnackbar } from "notistack"
import { useForm } from "react-hook-form"
import { useAuthStore } from "src/stores"
import { v4 as uuidv4 } from "uuid"
type EmptyWorkExperienceProps = {
  onFinish: () => void
}

type FormFields = {
  company: string
  title: string
  startDate: Date
  endDate: Date
  description: string
}

export const EmptyWorkExperience = ({ onFinish }: EmptyWorkExperienceProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      company: "",
      title: "",
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
      professionalOverview: {
        id: uuidv4(),
        ...userData.professionalOverview,
        workExperience: [...userData.professionalOverview.workExperience, formFields],
      },
    }
    try {
      const { user: updatedUser, token } = await fetchApi({
        url: "/user",
        method: "PATCH",
        body: requestData,
      })
      setUserStore(updatedUser, token)
      onFinish()
      enqueueSnackbar("Work Experience added", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("Something went wrong", { variant: "error" })
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
          {...register("company", { required: true })}
        />
        <TextField size="small" margin="dense" label="Title" fullWidth {...register("title")} />

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
