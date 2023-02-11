import Link from "next/link";
import { Paper, Box, Avatar, Typography, Divider, MenuItem} from '@mui/material'
import { useAuthStore } from 'stores';
import { countriesList } from '../../../constants';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC } from 'react'

export const ProfileOverview: FC = () => {
  const userData = useAuthStore((state: any) => state.user);
  
  // todo add loading state with skeleton component
  if (!userData) return <>Loading...</>
  
  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
  }

  return (
    <Paper elevation={2} sx={{ display: 'flex', py: 5, px: 3 }}>
      <Avatar alt={userData?.name} src={userData?.picture} sx={{ width: 56, height: 56 }} />
      <Box sx={{ mx: 3, flexGrow: 1 }}>
        <Typography variant="h5">{userData?.name}</Typography>
        <Typography variant="subtitle1" fontWeight="bold">Front-end Developer @ Rivian</Typography>
        <Typography variant="subtitle1">
          {countriesList.find(({ code }) => code === userData?.general?.currentLocation)?.name}
        </Typography>
        <Divider sx={{ my: 2, visibility: 'hidden' }} />
        <Typography variant="subtitle1" fontWeight="bold">Where are you on your job search?</Typography>
        <Typography variant="subtitle1">Keep your job status up-to-date to inform employers of your search.</Typography>
        <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={`${userData?.relocation?.activelyLooking}`}
        onChange={handleSelectChange}
      >
        <MenuItem value={"true"}>I am active looking and interviewing!</MenuItem>
        <MenuItem value={"false"}>I am just browsing for now</MenuItem>
      </Select>
      </Box>
      <Box>
        <Link href="/profile">View your public profile</Link>
      </Box>
    </Paper>
  )
}