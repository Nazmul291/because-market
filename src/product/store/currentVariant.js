import { writable, derived, get } from "svelte/store"
import { PRODUCT_PACK_SIZE_OPTION } from "../../const"
import {
  arrayEqual,
  arrayRemoveIndex,
  findVariantByOption,
  findVariantByOptions,
} from "../../utils"
import { normalizeOtpName, PACK_OPTION_NORMALIZE } from "./product"

export default ({ product, quantity }) => {
  const { subscribe, set } = writable(null)
  const subscription = writable(null)

  const currentVariant = {
    subscribe,
    set,
    setByOptions: (options) => {
      const productOptionsIndex = get(product.optionsIndex)
      const availableVariants = get(product.availableVariants)

      set(
        findVariantByOptions(options, availableVariants, productOptionsIndex) ||
          availableVariants[0]
      )
    },
    changeByOption: (key, value) => {
      const currentOptions = get(groupedOption)
      const productOptionsIndex = get(product.optionsIndex)
      const availableVariants = get(product.availableVariants)

      set(
        findVariantByOption(
          key,
          value,
          currentOptions,
          availableVariants,
          productOptionsIndex
        )
      )
    },
  }

  const subscriptionDiscount = derived(
    [product.subscriptions, subscription],
    ([$productSubscriptions, $subscription]) => {
      return $productSubscriptions[$subscription] || 0
    }
  )

  const groupedOption = derived(
    [currentVariant, product],
    ([$currentVariant, $product]) => {
      if (!$currentVariant) {
        return {}
      }

      return $product.options.reduce((acc, opt, i) => {
        if (!$currentVariant.options) {
          return acc
        }

        acc[opt] = $currentVariant.options[i]
        return acc
      }, {})
    }
  )

  /**
   * Available option values for current variant
   */
  const availableOptionValues = derived(
    [currentVariant, product.availableVariants, product.productOptions],
    ([$currentVariant, $productAvailableVariants, $productOptions]) => {
      if (!$currentVariant || !$currentVariant.options) {
        return {}
      }

      return $currentVariant.options.reduce((acc, optionValue, index) => {
        const currentOptionsWithout = arrayRemoveIndex(
          $currentVariant.options,
          index
        )

        return $productAvailableVariants
          .filter(({ options }) => {
            const optionsWithout = arrayRemoveIndex(options, index)
            return arrayEqual(currentOptionsWithout, optionsWithout)
          })
          .reduce((acc, { options }) => {
            return options.reduce((acc, value, i) => {
              const name = $productOptions[i]

              if (!acc[name]) {
                acc[name] = []
              }

              if (!acc[name].includes(value)) {
                acc[name].push(value)
              }

              return acc
            }, acc)
          }, acc)
      }, {})
    }
  )

  const hasOneQuantityValue = derived(
    [availableOptionValues],
    ([$availableOptionValues]) => {
      return $availableOptionValues[PRODUCT_PACK_SIZE_OPTION]?.length === 1
    }
  )

  const availableOptionArr = derived(
    [product.optionsArr, hasOneQuantityValue],
    ([$productOptionsArr, $hasOneQuantityValue]) => {
      return !$hasOneQuantityValue
        ? $productOptionsArr
        : $productOptionsArr.filter(
            ({ key }) => normalizeOtpName(key) !== PACK_OPTION_NORMALIZE
          )
    }
  )

  const price = derived(
    [currentVariant, quantity],
    ([$currentVariant, $quantity]) =>
      !$currentVariant ? 0 : $currentVariant.price * $quantity
  )

  const finalPrice = derived(
    [price, subscriptionDiscount],
    ([$price, $subscriptionDiscount]) => {
      return !$subscriptionDiscount
        ? $price
        : $price * (1 - $subscriptionDiscount / 100)
    }
  )

  const finalPricePerPiece = derived(
    [finalPrice, groupedOption, quantity],
    ([$finalPrice, $groupedOption, $quantity]) => {
      const quantityOption = $groupedOption[PRODUCT_PACK_SIZE_OPTION]

      return quantityOption
        ? $finalPrice / (parseInt(quantityOption, 10) * $quantity)
        : $finalPrice
    }
  )

  return {
    ...currentVariant,
    groupedOption,
    availableOptionValues,
    hasOneQuantityValue,
    availableOptionArr,
    price,
    subscription,
    subscriptionDiscount,
    finalPrice,
    finalPricePerPiece,
  }
}
