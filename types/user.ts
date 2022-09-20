export type UserType = {
  name: string,
  username: string,
  email: string,
  picture: string,
  passwordHash: string,
  id: string,
  accessCount: number,
  jobsApplied: [number],
  general: {
    citizenship_code: string,
    gender: string,
    currentLocation: string,
    phone: string,
  },
  professionalOverview: {
    profession: number,
    yearsOfExp: number,
    openToDiffRole: Boolean,
    preferenceToWork: [number],
    skillRank: [
      { skillId: number, yearsOfExp: number },
    ],
  },
  relocation: {
    openToRemote: Boolean,
    relocateOptions: string,
    cadSalaryExpect: number,
    canadianVisa: number,
    usdSalaryExpect: number,
    validPassport: Boolean,
    companySize: [string],
    activelyLooking: Boolean,
    noticePeriod: number,
  },
  social: [
    { name: string, url: string }
  ]
}