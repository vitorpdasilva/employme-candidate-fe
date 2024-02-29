import { Box, Tab, Tabs, Typography } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'
import { userStore } from '~/stores'
import { Culture, Preferences, Resume, Profile as TabProfile } from './tabs'

type TabItemsProps = { label: string; index?: number; component: JSX.Element }

const tabItems: TabItemsProps[] = [
  { label: 'Profile', component: <TabProfile /> },
  { label: 'Resume/CV', component: <Resume /> },
  { label: 'Preferences', component: <Preferences /> },
  { label: 'Culture', component: <Culture /> },
]

type TabPanelProps = {
  children?: ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps): JSX.Element => {
  const { children, value, index } = props

  return (
    <Box role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  )
}

const Profile = (): JSX.Element => {
  const user = userStore((state) => state.user)
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_: SyntheticEvent, newValue: number): void => setTabValue(newValue)

  if (!user) {
    return <>loading...</>
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h3">Edit your profile</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
          <Tabs sx={{ position: 'sticky', top: '300px' }} value={tabValue} onChange={handleTabChange}>
            {tabItems.map(({ label }: TabItemsProps, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Box>
        {tabItems.map(({ component }, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
            {component}
          </TabPanel>
        ))}
      </Box>
    </>
  )
}

export default Profile
