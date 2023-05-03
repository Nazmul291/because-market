import { derived } from "svelte/store"

export default ({ product, currentVariant }) => {
  const discount = derived(
    [product.maxSubscription, currentVariant.subscriptionDiscount],
    ([$productMaxSubscription, $currentVariantSubscriptionDiscount]) => {
      return $currentVariantSubscriptionDiscount
        ? $currentVariantSubscriptionDiscount
        : $productMaxSubscription
        ? $productMaxSubscription.value
        : 0
    }
  )

  const subscribePrice = derived(
    [discount, currentVariant.price],
    ([$discount, $currentVariantPrice]) =>
      $currentVariantPrice * (1 - $discount / 100)
  )

  return {
    ...discount,
    subscribePrice,
  }
}
