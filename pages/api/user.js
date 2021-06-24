const userData = {
  general: {
    citizenship_code: 'BR',
    gender: 'male',
    currentLocation: 'BR',
    phone: '123 456 7890',
  },
  professionalOverview: {
    profession: 3,
    yearsOfExp: 5,
    openToDiffRole: true,
    preferenceToWork: [2, 5, 9],
    skillRank: [
      { skill: 132, yearsOfExp: 3},
      { skill: 976, yearsOfExp: 2},
      { skill: 5395, yearsOfExp: 4},
    ],
  },
  relocation: {
    openToRemote: true,
    relocateOptions: 'CA',
    cadSalaryExpect: 3,
    canadianVisa: 2,
    usdSalaryExpect: 2,
    validPassport: true,
    companySize: ['startup', 'midsize', 'corporate'],
    activelyLooking: false,
    noticePeriod: 2,
  },
}

export default function(req, res) {
  res.status(200).json(userData);
}