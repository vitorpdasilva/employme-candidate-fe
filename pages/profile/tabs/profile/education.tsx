import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"
import { EmptyEducation } from "components/EmptyEducation"
import Link from "next/link"
import { useState } from "react"
import { useAuthStore } from "stores/auth"

export const Education = () => {
  const userData = useAuthStore((state: any) => state.user)
  const [newEducation, setNewEducation] = useState<0 | 1>(0)

  return (
    <Grid sx={{ my: 3 }} container spacing={0}>
      <Grid item xs={12} md={3}>
        Education
      </Grid>
      <Grid item xs={12} md={9}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            {userData.education.map((item: any) => (
              <Paper key={item.degree} sx={{ p: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    variant="square"
                    src="https://photos.angel.co/startups/i/4634051-16164880183cfb651e472aafce896328-medium_jpg.jpg?buster=1589648733"
                    sx={{ mr: 1 }}
                  >
                    {item.school}
                  </Avatar>
                  <Box>
                    <Typography>{item.school}</Typography>
                    <Link target="_blank" href="https://senac.com.br">
                      {item.fieldOfStudy}
                    </Link>
                    <Box sx={{ textAlign: "justify" }}>{item.description}</Box>
                  </Box>
                </Box>
              </Paper>
            ))}
            {Array.from({ length: newEducation })?.map(() => (
              <EmptyEducation onFinish={() => setNewEducation(0)} key={Math.random()} />
            ))}
            <Button variant="text" onClick={() => setNewEducation(1)}>
              + Add Education
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  )
}
