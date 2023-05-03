import { useMemo } from "react"
import { getMetafieldValue } from "../utils"

/**
 * Return product metafiled value
 * @param {Object} product product
 * @param {String} namespace namespace
 * @param {String} key key
 * @returns {*} return value
 */
function useProductMetafieldValue(product, namespace, key) {
  return useMemo(
    () => getMetafieldValue(product?.metafields, namespace, key),
    [product, namespace, key]
  )
}

export default useProductMetafieldValue
