import { useMemo } from "react"

const DEFAULT_PRICE_HANDLING_TRIAL = 1.14

/**
 * Return selected variant for skip trial modal with price handling
 * @param {Object} product product
 * @param {String} selectedVariantId selected variant id
 * @param {Number} [priceHandling] price handling (default=1.14)
 * @returns {Object} variant
 */
function useSelectedVariantByIdForSkipTrial(
  product,
  selectedVariantId,
  priceHandling = DEFAULT_PRICE_HANDLING_TRIAL
) {
  return useMemo(() => {
    const findingVariant =
      product.variants.find(({ id }) => id === selectedVariantId) ??
      product.variants[0]

    if (!findingVariant) {
      return null
    }

    const { amount, currency } = findingVariant.price
    const priceAmount = (parseFloat(amount || 0) * priceHandling).toFixed(2)

    return {
      ...findingVariant,
      price: {
        currency,
        amount: priceAmount,
      },
    }
  }, [product, selectedVariantId, priceHandling])
}

export default useSelectedVariantByIdForSkipTrial
