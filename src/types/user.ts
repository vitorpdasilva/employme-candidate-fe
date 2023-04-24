
import { SemanticICONS } from "semantic-ui-react"

export type UserType = {
  name: string,
  username: string,
  email: string,
  picture: string,
  passwordHash: string,
  id: string,
  accessCount: number,
  jobsApplied: number[],
  general: {
    citizenship_code: string,
    gender: string,
    currentLocation: string,
    phone: string,
  },
  professional: Userprofessional,
  relocation: UserRelocation,
  social: UserSocial,
}

export type Userprofessional = {
  profession: number,
  yearsOfExp: number,
  openToDiffRole: Boolean,
  preferenceToWork: number[],
  skillRank: [
    { skillId: number, yearsOfExp: number },
  ],
}

export type UserRelocation = {
  openToRemote: Boolean,
  relocateOptions: string,
  cadSalaryExpect: number,
  canadianVisa: number,
  usdSalaryExpect: number,
  validPassport: Boolean,
  companySize: string[],
  activelyLooking: Boolean,
  noticePeriod: number,
}
type SocialKeys = "name" | "url"
export type UserSocial = Array<Record<SocialKeys, string | SemanticICONS>>
