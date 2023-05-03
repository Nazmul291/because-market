import { useMemo } from "react"
import {
  PRODUCT_METAFIELD_KEY_YOTPO_PRODUCT_ID,
  PRODUCT_METAFIELD_NAMESPACE_YOTPO,
} from "../const"
import { getMetafieldValue, sanitizeStorefrontId } from "../utils"

/**
 * Return yotpo review product id
 * @param {Object} product product
 * @returns {Number} product id
 */
function useProductYoptoReviewId(product) {
  return useMemo(() => {
    if (!product) {
      return null
    }

    const yoptoProductId = getMetafieldValue(
      product.metafields,
      PRODUCT_METAFIELD_NAMESPACE_YOTPO,
      PRODUCT_METAFIELD_KEY_YOTPO_PRODUCT_ID
    )

    return Number(yoptoProductId) ?? sanitizeStorefrontId(product.id)
  }, [product])
}

export default useProductYoptoReviewId
