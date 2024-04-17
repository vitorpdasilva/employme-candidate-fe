import { Alert, Button, Stack, Input } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import LoopIcon from '@mui/icons-material/Loop'
import { useOnResumeUpload } from '~/queries'
import { ChangeEvent } from 'react'

export const Resume = (): JSX.Element => {
  const { onCall, loading } = useOnResumeUpload()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      onCall(file)
    }
  }

  return (
    <Stack direction={'row'} spacing={2}>
      <Alert severity="info" variant="outlined">
        Testing
      </Alert>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={loading ? <LoopIcon /> : <CloudUploadIcon />}
      >
        Upload file
        <Input sx={{ opacity: 0 }} type="file" hidden onChange={handleFileChange} />
      </Button>
    </Stack>
  )
}
