import { Avatar, Box } from '@mui/material'
import { ChangeEvent } from 'react'
import { CompressedImage, compressImage } from '~/helpers'
import { userStore } from '~/stores'
import { UpdateUserInputDto, useOnUpdateUser } from '~/queries'

export const ProfilePicture = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const { onUpdateUser } = useOnUpdateUser()
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    console.log('here1?')
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
      console.log('here2?')
      onUpdateUser({ userId: user?.id ?? '', data: requestData as Partial<UpdateUserInputDto> })
    }
    reader.onerror = (error): void => {
      console.log('error', error)
    }
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar alt={`${user?.name}'s picture`} src={user?.picture?.data} sx={{ width: 56, height: 56, mr: 3 }} />
      <input type="file" onChange={handleFileChange} name="file" />
    </Box>
  )
}
