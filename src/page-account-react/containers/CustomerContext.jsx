import React, { useContext, useMemo, useState } from "react"
import { PROFILE_URL } from "../../const"
import { makeGetRequest, makePutRequest } from "../../utils"

export const CustomerContext = React.createContext()

export const useCustomerContext = () => useContext(CustomerContext)

export const useCustomerContextValue = (initialCustomerState = {}) => {
  const [customer] = useState(initialCustomerState)
  const [loading, setLoading] = useState(false)
  const [profileLoadingError, setProfileLoadingError] = useState(null)
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [profile, setProfile] = useState({
    email: initialCustomerState?.email,
    firstName: initialCustomerState?.firstName,
    lastName: initialCustomerState?.lastName,
    phone: initialCustomerState?.phone,
    defaultAddress: {
      address1: initialCustomerState?.defaultAddress?.address1,
      apt: initialCustomerState?.defaultAddress?.address2,
      city: initialCustomerState?.defaultAddress?.city,
      province: initialCustomerState?.defaultAddress?.province,
      zip: initialCustomerState?.defaultAddress?.zip,
    },
  })

  return useMemo(() => {
    return {
      profile,
      customer,
      loading,
      profileLoaded,
      profileLoadingError,
      profileLoad: () => {
        setLoading(true)
        setProfileLoaded(false)
        setProfileLoadingError(null)

        return makeGetRequest(PROFILE_URL)
          .then((res) => {
            setProfile(res)
            setProfileLoaded(true)
          })
          .catch((error) => setProfileLoadingError(error))
          .finally(() => setLoading(false))
      },
      profileUpdate: (profile) => {
        setLoading(true)
        return makePutRequest(PROFILE_URL, { profile })
          .then(setProfile)
          .finally(() => setLoading(false))
      },
    }
  }, [profile, customer, loading, profileLoaded, profileLoadingError])
}
