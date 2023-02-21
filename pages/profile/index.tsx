import { Box, Tab, Tabs, Typography } from "@mui/material"
import React, { FC, ReactNode, useState } from "react"
import { useAuthStore } from "src/stores"
import {
  Culture,
  Overview,
  Preferences,
  Profile as TabProfile,
  Resume,
} from "./tabs"

const placeHolder = "https://via.placeholder.com/150"
type TabItemsProps = {
  label: string
  index: number
  component: ReactNode
}
const tabItems: TabItemsProps[] = [
  { label: "Overview", index: 0, component: <Overview /> },
  { label: "Profile", index: 1, component: <TabProfile /> },
  { label: "Resume/CV", index: 2, component: <Resume /> },
  { label: "Preferences", index: 3, component: <Preferences /> },
  { label: "Culture", index: 4, component: <Culture /> },
]

type TabPanelProps = {
  children?: ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  )
}

const Profile: FC = () => {
  const userData = useAuthStore((state: any) => state.user)
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log({ newValue })
    setTabValue(newValue)
  }

  console.log("pages/profile", { userData })

  if (!userData) {
    return <>loading...</>
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h3">Edit your profile</Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            {tabItems.map(({ label, index }) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Box>
        {tabItems.map(({ index, component }) => (
          <TabPanel key={index} value={tabValue} index={index}>
            {component}
          </TabPanel>
        ))}
      </Box>
      <div style={{ position: "relative" }}>
        <img src={userData?.picture || placeHolder} />
        {/* <Icon size="big" style={{ position: "absolute", right: 0, bottom: 10 }} name="camera" /> */}
      </div>
      {/* <GeneralProfileSection />
      <ProfessionalProfileSection />
      <RelocationProfileSection />
      <SocialSection /> */}
    </>
  )
}

export default Profile
