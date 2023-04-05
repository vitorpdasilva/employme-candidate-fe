export type CurrencyList = {
  name: string
  value: string
  symbol: string
}
export const currencyList: CurrencyList[] = [
  { name: "USD", value: "USD", symbol: "$USD" },
  { name: "EUR", value: "EUR", symbol: "€" },
  { name: "GBP", value: "GBP", symbol: "£" },
  { name: "JPY", value: "JPY", symbol: "¥" },
  { name: "AUD", value: "AUD", symbol: "$AUD" },
  { name: "CAD", value: "CAD", symbol: "$CAD" },
  { name: "BRL", value: "BRL", symbol: "R$" },
]
