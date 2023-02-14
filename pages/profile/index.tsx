import React, { useEffect, useContext, FC, ReactNode, useState } from "react";
import { Icon } from "semantic-ui-react";

import GeneralProfileSection from "./GeneralProfileSection";
import ProfessionalProfileSection from "./ProfessionalProfileSection";
import RelocationProfileSection from "./RelocationProfileSection";
import SocialSection from "./SocialSection";
import { useAuthStore } from "stores";
import { Box, Tab, Tabs, Typography } from "@mui/material";
const placeHolder = "https://via.placeholder.com/150";

const TabItems: any = [
  { label: 'Overview', index: 0, component: <>overview</> }, 
  { label: 'Profile', index: 1, component: <>profile</> },
  { label: 'Resume/CV', index: 2, component: <>resume</> },
  { label: 'Preferences', index: 3, component: <>preferences</> },
  { label: 'Culture', index: 4, component: <>culture</> },
]

type TabPanelProps = {
  children?: ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

const Profile: FC = () => {
  const userData = useAuthStore((state: any) => state.user);
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log({ newValue })
    setTabValue(newValue)
  }
  
  if (!userData) {
    return <>loading...</>;
  }
  
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h3">Edit your profile</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            {TabItems.map(({ label, index }) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Box>
        {TabItems.map(({ index, component }) => (
          <TabPanel key={index} value={tabValue} index={index}>
            {component}
          </TabPanel>
        ))}
      </Box>
      <div style={{ position: "relative" }}>
        <img src={userData?.picture || placeHolder} />
        {/* <Icon size="big" style={{ position: "absolute", right: 0, bottom: 10 }} name="camera" /> */}
      </div>
      <GeneralProfileSection />
      <ProfessionalProfileSection />
      <RelocationProfileSection />
      <SocialSection />
    </>
  );
};

export default Profile;