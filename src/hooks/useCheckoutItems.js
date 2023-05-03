import { useMemo } from "react"
import { isTrialCheckout } from "../utils"

/**
 * Return checkout items. If checkout are trial, return only trial items
 * @param {Object} checkout checkout
 * @returns {Array<items>|null} checkout items
 */
function useCheckoutItems(checkout) {
  return useMemo(() => {
    const isTrial = isTrialCheckout(checkout)

    return !isTrial
      ? checkout?.items
      : checkout?.items?.filter((item) => item.isTrial)
  }, [checkout])
}

export default useCheckoutItems
