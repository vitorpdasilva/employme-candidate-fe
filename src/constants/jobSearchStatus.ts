import { components } from '~/types'

type JobSearchStatus = components['schemas']['JobSearchStatus']

export type JobKeys = {
  value: JobSearchStatus
  label: string
}

export const jobSearchStatus: JobKeys[] = [
  { value: 'ACTIVE', label: 'Ready to interview' },
  { value: 'OPEN', label: 'Open to offers' },
  { value: 'CLOSED', label: 'Closed to offers' },
]
