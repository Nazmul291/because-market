import { useCallback, useEffect, useMemo, useState } from "react"
import { PRODUCT_EXCLUDE_OPTIONS_IF_ONE } from "../const"
import {
  findVariantByGroupedOptions,
  getStorefrontProductVariantId,
  groupVariantOptions,
  isEqualProductVariantOptionValue,
  isStringEqualNormalized,
  noop,
} from "../utils"

function hasVariantOption(variant, name, value) {
  return isEqualProductVariantOptionValue(
    variant?.selectedOptions?.find((option) => option.name === name)?.value,
    value
  )
}

/**
 * Return api for select variant from product.
 * @param {Object} product current product with variants
 * @param {String} [initialVariantId] initial variant id
 * @param {Function} [onChange] on variant change callback
 * @returns {Object} api for variant selected
 */
export function useSelectProductVariant(
  product,
  initialVariantId,
  onChange = noop
) {
  const productOptions = product?.options
  const [selectedVariant, setSelectedVariant] = useState(null)
  const setSelectedVariantHandler = useCallback(
    (value) => {
      setSelectedVariant(value)
      onChange(value)
    },
    [onChange]
  )

  const options = useMemo(() => {
    if (productOptions?.length !== 1) {
      return productOptions
    }

    return productOptions.filter(
      ({ name }) =>
        !PRODUCT_EXCLUDE_OPTIONS_IF_ONE.some((excludeOptionName) =>
          isStringEqualNormalized(name, excludeOptionName)
        )
    )
  }, [productOptions])

  const availableVariants = useMemo(() => {
    return product?.variants?.filter(({ available }) => available)
  }, [product])

  const selectedOptionsGrouped = useMemo(
    () => groupVariantOptions(selectedVariant),
    [selectedVariant]
  )

  /**
   * set variant by option
   */
  const setVariantByOption = useCallback(
    (name, value) => {
      const variantsWithSelectOption = availableVariants?.filter((variant) =>
        hasVariantOption(variant, name, value)
      )

      const find = findVariantByGroupedOptions(variantsWithSelectOption, {
        ...selectedOptionsGrouped,
        [name]: value,
      })

      setSelectedVariantHandler(find || variantsWithSelectOption[0])
    },
    [availableVariants, selectedOptionsGrouped, setSelectedVariantHandler]
  )

  const data = useMemo(
    () => ({
      options,
      availableOptions: options,
      selectedVariant,
      selectedOptionsGrouped,
    }),
    [options, selectedVariant, selectedOptionsGrouped]
  )

  const api = {
    setVariantByOption,
  }

  useEffect(() => {
    if (availableVariants?.length) {
      const variantId = getStorefrontProductVariantId(initialVariantId)

      const variant =
        availableVariants.length === 1
          ? availableVariants[0]
          : availableVariants.find(({ id }) => variantId === id)

      setSelectedVariantHandler(variant || availableVariants[0])
    }
  }, [availableVariants, initialVariantId, setSelectedVariantHandler])

  return [data, api]
}
