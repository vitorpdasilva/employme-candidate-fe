import { useState } from "react"
import FileUpload from "react-material-file-upload"

export const Resume = () => {
  const [files, setFiles] = useState<File[]>([])
  return (
    <>
      <FileUpload accept={".pdf"} value={files} onChange={setFiles} />
    </>
  )
}
