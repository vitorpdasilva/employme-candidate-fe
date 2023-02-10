import { Box, Avatar, Typography } from '@mui/material'
import { useAuthStore } from 'stores';

export const ProfileOverview = () => {
  const userData = useAuthStore((state: any) => state.user);
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar alt={userData.name} src={userData.picture} sx={{ width: 56, height: 56 }} />
      <Box><Typography variant="h4">{userData.name}</Typography></Box>
    </Box>
  )
}