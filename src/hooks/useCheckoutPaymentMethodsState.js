import { useEffect } from "react"
import { fetchProductTags } from "../api/storefrontApi"
import {
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_PAYPAL,
  PRODUCT_TAG_DISABLE_PAYPAL,
} from "../const"
import { arrayUnique, isStringEqualNormalized } from "../utils"
import { useAsyncState } from "./useAsyncState"

/**
 * Return state for checkout payment methods
 * @param {Object} checkout checkout
 * @returns {Array} available payment method
 */
export function useCheckoutPaymentMethodsState(checkout) {
  const { items } = checkout || {}

  const [state, exec] = useAsyncState((ids) =>
    Promise.all(arrayUnique(ids).map((id) => fetchProductTags(id))).then(
      (results) => {
        const tags = arrayUnique(results.flat())
        const disablePayPal = tags.some((tag) =>
          isStringEqualNormalized(tag, PRODUCT_TAG_DISABLE_PAYPAL)
        )
        const paymentMethods = [PAYMENT_METHOD_CARD]

        if (!disablePayPal) {
          paymentMethods.push(PAYMENT_METHOD_PAYPAL)
        }

        return paymentMethods
      }
    )
  )

  const { loaded, loading } = state

  useEffect(() => {
    if (!items || loaded || loading) {
      return
    }

    const productIds = items
      ? items?.map((item) => item?.productId)?.filter((id) => Boolean(id))
      : null

    exec(productIds)
  }, [items, loaded, loading]) // eslint-disable-line react-hooks/exhaustive-deps

  return state
}
