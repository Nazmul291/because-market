import { createContext } from "react"

export const CheckoutSuccessContext = createContext({
  monthlyTotal: "$0.00",
  setMonthlyTotal: () => {},
})
