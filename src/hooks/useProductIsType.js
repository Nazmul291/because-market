import { useMemo } from "react"

/**
 * Is product type
 * @param {Object} product product
 * @param {String} type product type
 * @returns {Boolean} is product have type
 */
function useProductIsType(product, type) {
  return useMemo(() => {
    if (!product || !type) {
      return false
    }

    return product.productType?.toLowerCase()?.index(type.toLowerCase()) >= 0
  }, [product, type])
}

export default useProductIsType
