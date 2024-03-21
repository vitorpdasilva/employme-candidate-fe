import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

import { components } from '~/types'
import { ComponentType } from 'react'
import { SvgIconProps } from '@mui/material'

export type SocialMedia = {
  name: components['schemas']['SocialMedia']
  url: string
}

export type SocialMediaList = {
  name: components['schemas']['SocialMedia']
  Icon: ComponentType<SvgIconProps>
}

const socialMedias: SocialMediaList[] = [
  { name: 'Facebook', Icon: FacebookIcon },
  { name: 'Github', Icon: GitHubIcon },
  { name: 'Linkedin', Icon: LinkedInIcon },
  { name: 'Twitter', Icon: TwitterIcon },
  { name: 'Instagram', Icon: InstagramIcon },
]

export const socialMediasList = socialMedias.map(({ name, Icon }) => ({
  name,
  Icon,
}))
