import { useMemo } from "react"
import { isClosedCheckout } from "../utils"

function useIsClosedCheckout(checkout) {
  return useMemo(() => isClosedCheckout(checkout), [checkout])
}

export default useIsClosedCheckout
