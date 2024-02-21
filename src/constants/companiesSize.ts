export type CompanySizes = {
  id: number
  label: string
  name: string
  value: null
}

export const companySizes: CompanySizes[] = [
  { id: 1, label: 'Seed (1 - 10 employees)', name: 'seed', value: null },
  { id: 2, label: 'Early (11 - 50 employees)', name: 'early', value: null },
  { id: 3, label: 'Mid-Size (51 - 200 employees)', name: 'mid-size', value: null },
  { id: 4, label: 'Large (201 - 500 employees)', name: 'large', value: null },
  { id: 5, label: 'Very Large (501 - 10000 employees)', name: 'very-large', value: null },
  { id: 6, label: 'Massive (1000+ employees)', name: 'massive', value: null },
]
