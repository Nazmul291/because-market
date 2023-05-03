import { useMemo, useState } from "react"
import { checkoutUpdateById, validatePromoCode } from "../../api/marketApi"
import { CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION } from "../../const"

export default function usePromoCodes(checkout, onCheckoutChange) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return useMemo(
    () => ({
      loading,
      error,
      value: checkout?.coupons?.length ? checkout.coupons : null,
      apply: (code) => {
        if (loading) {
          return
        }

        setLoading(true)
        setError(null)

        validatePromoCode(code, {
          variants: checkout?.items?.map(({ id, quantity, type }) => {
            return {
              namespace: CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
              key: type,
              quantity,
              id,
            }
          }),
        })
          .then(() =>
            checkoutUpdateById(checkout.id, {
              coupons: checkout.coupons ? [...checkout.coupons, code] : [code],
            }).then(onCheckoutChange)
          )
          .catch(setError)
          .finally(() => setLoading(false))
      },
      remove: () => {
        if (loading) {
          return
        }

        setLoading(true)
        setError(null)

        checkoutUpdateById(checkout.id, {
          coupons: [],
        })
          .then(onCheckoutChange)
          .catch(setError)
          .finally(() => setLoading(false))
      },
    }),
    [
      checkout?.coupons,
      checkout?.id,
      checkout?.items,
      error,
      loading,
      onCheckoutChange,
    ]
  )
}
