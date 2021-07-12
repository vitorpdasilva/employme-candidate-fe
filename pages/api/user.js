const userData = {
  general: {
    citizenship_code: 'BR',
    gender: 'female',
    currentLocation: 'BR',
    phone: '123 456 7890',
  },
  professionalOverview: {
    profession: 3,
    yearsOfExp: 5,
    openToDiffRole: true,
    preferenceToWork: [2, 5, 9],
    skillRank: [
      { skill: 132, yearsOfExp: 3 },
      { skill: 976, yearsOfExp: 2 },
      { skill: 5395, yearsOfExp: 4 },
    ],
  },
  relocation: {
    openToRemote: true,
    relocateOptions: 'CA',
    cadSalaryExpect: 3,
    canadianVisa: 2,
    usdSalaryExpect: 2,
    validPassport: true,
    companySize: ['startup', 'midsize'],
    activelyLooking: false,
    noticePeriod: 1,
  },
  social: [
    { name: 'linkedin', url: 'linkedin.com/in/vitorboccio' },
    { name: 'github', url: 'github.com/vitorboccio' },
    { name: 'facebook', url: 'facebook.com/vitorboccio' },
    { name: 'twitter', url: 'twitter.com/vitorboccio' },
  ]
}

export default function(req, res) {
  res.status(200).json(userData);
}