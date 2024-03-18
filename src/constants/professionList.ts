import { components } from '~/types'

type Professions = components['schemas']['ProfessionType']

type ProfessionList = {
  value: Professions
}

const professionValues: Professions[] = [
  'Backend Engineer',
  'Frontend Engineer',
  'Full Stack Engineer',
  'Web Developer',
  'Game Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Site Reliability Engineer',
  'Security Engineer',
  'QA Engineer',
  'Data Analyst',
  'Data Scientist',
  'Data Engineer',
  'Machine Learning Engineer',
  'Blockchain Engineer',
  'Embedded Engineer',
  'Mainframe Engineer',
  'Hardware Engineer',
  'Middleware Engineer',
  'Firmware Engineer',
  'Systems Administrator',
  'Database Administrator',
  'Network Administrator',
  'Telecommunications Engineer',
  'Salesforce Developer',
  'Business Analyst',
  'SAP Consultant',
  'Software Architect',
  'Scrum Master',
  'Agile Coach',
  'Product Manager',
  'Project Manager',
  'IT Manager',
  'IT Director',
  'Chief Technology Officer (CTO)',
  'Other',
  'Solutions Architect',
]

export const professionList: ProfessionList[] = professionValues.map((value) => ({
  value,
}))
