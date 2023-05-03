import { useEffect } from "react"
import { fetchProduct } from "../api/storefrontApi"
import { useAsyncState } from "./useAsyncState"

const fetchAndTransformProduct = (id) =>
  fetchProduct(id).then(({ options, variants, ...product }) => {
    return {
      ...product,
      options: options.map(({ name }) => name),
      variants: variants.map((variant) => ({
        ...variant,
        options: variant?.selectedOptions?.map(({ value }) => value) || [],
      })),
    }
  })

/**
 * Fetch product
 * @param {String} productId product id
 * @returns {Object} product loading state
 */
export function useFetchProductState(productId) {
  const [state, exec] = useAsyncState(fetchAndTransformProduct)

  useEffect(() => {
    if (!productId) {
      return
    }

    exec(productId)
  }, [productId]) // eslint-disable-line react-hooks/exhaustive-deps

  return state
}
