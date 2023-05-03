import { useMemo } from "react"
import { isTrialCheckout } from "../utils"

function useIsTrialCheckout(checkout) {
  return useMemo(() => isTrialCheckout(checkout), [checkout])
}

export default useIsTrialCheckout
