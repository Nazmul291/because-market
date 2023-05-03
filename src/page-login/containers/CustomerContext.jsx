import React, { useContext } from "react"

export const CustomerContext = React.createContext()

export const useCustomerContext = () => useContext(CustomerContext)
