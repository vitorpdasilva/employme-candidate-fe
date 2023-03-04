export type CompanySizes = Record<string, number | string>

export const companySizes: CompanySizes[] = [
  { value: 1, label: "Seed (1 - 10 employees)" },
  { value: 2, label: "Early (11 - 50 employees)" },
  { value: 3, label: "Mid-Size (51 - 200 employees)" },
  { value: 4, label: "Large (201 - 500 employees)" },
  { value: 5, label: "Very Large (501 - 10000 employees)" },
  { value: 6, label: "Massive (1000+ employees)" },
]
