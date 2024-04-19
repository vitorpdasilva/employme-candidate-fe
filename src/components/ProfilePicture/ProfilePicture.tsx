import { Avatar, Box } from '@mui/material'
import { ChangeEvent } from 'react'
import { CompressedImage, compressImage } from '~/helpers'
import { userStore } from '~/stores'
import { UpdateUserInputDto, useOnUpdateUser } from '~/queries'

export const ProfilePicture = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const { onCall } = useOnUpdateUser()
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload = async (): Promise<void> => {
      const compressedImage: CompressedImage = await compressImage(file as File, 800, 600, 0.7)
      const requestData = {
        picture: {
          data: compressedImage.dataUrl,
          createdAt: new Date().toISOString(),
        },
      }
      onCall({ data: requestData as Partial<UpdateUserInputDto> })
    }
    reader.onerror = (error): void => {
      console.error('error', error)
    }
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar alt={`${user?.name}'s picture`} src={user?.picture?.data} sx={{ width: 56, height: 56, mr: 3 }} />
      <input type="file" onChange={handleFileChange} name="file" />
    </Box>
  )
}
