import Head from "next/head"
import { ProfileOverview, NavSidebar } from "src/components"
import Grid from '@mui/material/Unstable_Grid2'
import { Box } from "@mui/material";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Employ Me Overseas (EMO) - Home Page</title>
        <meta name="description" content="Employ Me Overseas (EMO) - Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container >
          <Grid xs={2}>
            <NavSidebar />
          </Grid>
          <Grid xs={10}>
            <ProfileOverview />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
