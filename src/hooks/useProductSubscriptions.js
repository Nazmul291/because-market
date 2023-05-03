import { useMemo } from "react"
import { PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION } from "../const"

export function useProductSubscriptions(product) {
  return useMemo(() => {
    const subscriptions = product?.metafields
      ?.reduce((acc, meta) => {
        if (!meta) {
          return acc
        }

        const { namespace, key, value } = meta

        if (namespace !== PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION) {
          return acc
        }

        if (!acc) {
          return [{ key, value }]
        }
        // else
        acc.push({ key, value })
        return acc
      }, null)
      ?.sort(({ value: value1 }, { value: value2 }) => value1 - value2)

    return {
      subscriptions,
      subscriptionWithMaxDiscount:
        subscriptions && subscriptions[subscriptions.length - 1],
    }
  }, [product])
}
