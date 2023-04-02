import { Box, Button, Paper, TextField } from "@mui/material"
import { fetchApi } from "client"

import { useForm } from "react-hook-form"
import { useAuthStore } from "src/stores"
import { v4 as uuidv4 } from "uuid"

type EmptyWorkExperienceProps = {
  onFinish: () => void
}

type FormFields = {
  company: string
  title: string
  startDate: string
  endDate: string
  description: string
}

export const EmptyWorkExperience = ({ onFinish }: EmptyWorkExperienceProps) => {
  const userData = useAuthStore((state: any) => state.user)
  const setUserStore = useAuthStore((state: any) => state.setUser)

  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      company: "",
      title: "",
      startDate: "",
      endDate: "",
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
    console.log({ requestData })
    const { user: updatedUser, token } = await fetchApi({
      url: "/user",
      method: "PATCH",
      body: requestData,
    })
    setUserStore(updatedUser, token)
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
          label="Start Date"
          {...register("startDate")}
        />

        <TextField
          type="date"
          size="small"
          margin="dense"
          fullWidth
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
