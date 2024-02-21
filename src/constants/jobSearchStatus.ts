export type JobKeys = {
  value: number
  label: string
}
export const jobSearchStatus: JobKeys[] = [
  { value: 0, label: 'Ready to interview' },
  { value: 1, label: 'Open to offers' },
  { value: 2, label: 'Closed to offers' },
]
