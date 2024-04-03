import { Avatar, Box, Button, Grid, Paper, Stack, Typography, Link } from '@mui/material'
import { useState } from 'react'
import { EmptyEducation } from '~/components'
import { userStore } from '~/stores'

export const Education = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const [newEducation, setNewEducation] = useState<0 | 1>(0)

  return (
    <Grid sx={{ my: 3, mb: '100px' }} container spacing={0}>
      <Grid item xs={12} md={3}>
        Education
      </Grid>
      <Grid item xs={12} md={9}>
        <Stack spacing={2}>
          {user?.education?.map((item) => (
            <Paper key={item?.degree} sx={{ p: 2 }}>
              <Stack direction={'row'}>
                <Avatar
                  variant="square"
                  src="https://photos.angel.co/startups/i/4634051-16164880183cfb651e472aafce896328-medium_jpg.jpg?buster=1589648733"
                  sx={{ mr: 1 }}
                >
                  {item?.school}
                </Avatar>
                <Box>
                  <Typography variant="body1">{item?.degree}</Typography>
                  <Typography component={Link} variant="body2" target="_blank" href="#">
                    {item?.school}
                  </Typography>
                  <Typography variant="body2" fontWeight="500" sx={{ textAlign: 'justify' }}>
                    {item?.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
          {Array.from({ length: newEducation })?.map(() => (
            <EmptyEducation onFinish={(): void => setNewEducation(0)} key={Math.random()} />
          ))}
          <Button variant="text" onClick={(): void => setNewEducation(1)}>
            + Add Education
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
