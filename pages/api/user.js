const userData = {
  general: {
    citizenship_code: "BR",
    gender: "female",
    currentLocation: "BR",
    phone: "1234567890",
  },
  professional: {
    profession: 3,
    yearsOfExp: 5,
    openToDiffRole: true,
    preferenceToWork: [2, 5, 9],
    skillRank: [
      { skillId: 1529, yearsOfExp: 3 },
      { skillId: 1530, yearsOfExp: 2 },
      { skillId: 939, yearsOfExp: 4 },
    ],
  },
  relocation: {
    openToRemote: true,
    relocateOptions: "CA",
    cadSalaryExpect: 3,
    canadianVisa: 2,
    usdSalaryExpect: 2,
    validPassport: true,
    companySize: ["startup", "midsize"],
    activelyLooking: false,
    noticePeriod: 1,
  },
  social: [
    { name: "linkedin", url: "linkedin.com/in/vitorboccio" },
    { name: "github", url: "github.com/vitorboccio" },
    { name: "facebook", url: "facebook.com/vitorboccio" },
    { name: "twitter", url: "twitter.com/vitorboccio" },
  ]
}

export default function(req, res) {
  res.status(200).json(userData)
}
