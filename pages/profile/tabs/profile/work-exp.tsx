import { Avatar, Box, Button, Grid, Link, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { EmptyWorkExperience } from '~/components'
import { userStore } from '~/stores'

export const WorkExperience = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const [newWorkExperience, setNewWorkExperience] = useState<0 | 1>(0)

  return (
    <Grid sx={{ my: 3 }} container spacing={0}>
      <Grid item xs={12} md={3}>
        Your work experience
      </Grid>
      <Grid item xs={12} md={9}>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {user?.professional?.workExperiences?.map((experience) => (
              <Paper key={experience.company} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  <Avatar
                    variant="square"
                    src="https://photos.angel.co/startups/i/4634051-16164880183cfb651e472aafce896328-medium_jpg.jpg?buster=1589648733"
                    sx={{ mr: 1 }}
                  >
                    {experience.company}
                  </Avatar>
                  <Box>
                    <Typography>{experience.title}</Typography>
                    <Link target="_blank" href="#">
                      {experience.company}
                    </Link>
                    <Box sx={{ textAlign: 'justify' }}>{experience.description}</Box>
                  </Box>
                </Box>
              </Paper>
            ))}
            {Array.from({ length: newWorkExperience })?.map(() => (
              <EmptyWorkExperience onFinish={(): void => setNewWorkExperience(0)} key={Math.random()} />
            ))}
            <Button variant="text" onClick={(): void => setNewWorkExperience(1)}>
              + Add work experience
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  )
}
