import { useMemo } from "react"
import { getMetafieldNamespace } from "../utils"

/**
 * Return product metafiled namespace
 * @param {Object} product product
 * @param {String} namespace namespace
 * @returns {Object} return value
 */
function useProductMetafieldNamespace(product, namespace) {
  return useMemo(
    () => getMetafieldNamespace(product?.metafields, namespace),
    [product, namespace]
  )
}

export default useProductMetafieldNamespace
