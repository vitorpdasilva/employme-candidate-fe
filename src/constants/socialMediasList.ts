import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"

export type SocialMediasListType = {
  name: string
  Icon: typeof FacebookIcon | typeof GitHubIcon | typeof LinkedInIcon | typeof TwitterIcon
}

export const socialMediasList = [
  {
    name: "linkedin",
    Icon: LinkedInIcon,
  },
  {
    name: "github",
    Icon: GitHubIcon,
  },
  {
    name: "facebook",
    Icon: FacebookIcon,
  },
  {
    name: "twitter",
    Icon: TwitterIcon,
  },
]
