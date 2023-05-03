import React, { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import {
  CustomerContext,
  useCustomerContextValue,
} from "./containers/CustomerContext"
import AppRoute from "./containers/AppRoute"
import AccountMenu from "./containers/AccountMenu"
import Theme from "../rUI/Theme"
import AccountPageLayout from "./components/AccountPageLayout"

function App() {
  const customerContextValue = useCustomerContextValue(window._customer)
  const {
    profile,
    profileLoaded,
    profileLoadingError,
    loading: loadingProfile,
  } = customerContextValue

  useEffect(() => {
    if (!profileLoaded && !loadingProfile && !profileLoadingError) {
      customerContextValue.profileLoad()
    }
  }, [
    profile,
    profileLoaded,
    profileLoadingError,
    loadingProfile,
    customerContextValue,
  ])

  return (
    <Theme>
      <BrowserRouter>
        <CustomerContext.Provider value={customerContextValue}>
          <AccountPageLayout menu={AccountMenu}>
            <AppRoute />
          </AccountPageLayout>
        </CustomerContext.Provider>
      </BrowserRouter>
    </Theme>
  )
}

export default App
