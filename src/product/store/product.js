import { writable, derived } from "svelte/store"
import {
  PRODUCT_EXCLUDE_OPTIONS_IF_ONE,
  PRODUCT_PACK_SIZE_OPTION,
} from "../../const"
import { getRemovedOptionsFromTags } from "../../utils"
import { groupVariantByOptions } from "./utils"

export const normalizeOtpName = (name = "") =>
  name.replace(/\s/g, "").toLowerCase()

export const PACK_OPTION_NORMALIZE = normalizeOtpName(PRODUCT_PACK_SIZE_OPTION)

export default () => {
  const product = writable(null)

  const productOptions = derived(product, ($product) => {
    if ($product?.options.length !== 1) {
      return $product?.options
    }

    return $product?.options.filter(
      (option) => !PRODUCT_EXCLUDE_OPTIONS_IF_ONE.some((o) => o === option)
    )
  })

  const availableVariants = derived(product, ($product) =>
    $product?.variants
      ?.filter(({ available }) => available)
      .filter(({ options }) => {
        const removedOptions = getRemovedOptionsFromTags($product.tags) || []
        const hasRemovedValue = Boolean(
          options.find((value) => removedOptions.includes(String(value)))
        )
        return !hasRemovedValue
      })
  )

  const optionsIndex = derived(productOptions, ($productOptions) =>
    $productOptions.reduce(
      (acc, option, index) => ({ ...acc, [option]: index }),
      {}
    )
  )

  const subscriptions = derived(
    product,
    ($product) => $product?.metafields?.subscription || {}
  )

  const sortedSubscriptions = derived(subscriptions, ($subscriptions) =>
    Object.entries($subscriptions)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({ key, value }))
  )

  const maxSubscription = derived(
    sortedSubscriptions,
    ($sortedSubscriptions) => $sortedSubscriptions[0]
  )

  const hasSubscription = derived(
    subscriptions,
    ($subscriptions) => Object.keys($subscriptions).length > 0
  )

  const options = derived(
    [product, productOptions],
    ([$product, $productOptions]) =>
      groupVariantByOptions($productOptions, $product?.variants)
  )

  const optionsArr = derived([options, product], ([$options, $product]) =>
    Object.entries($options)
      .map(([key, values]) => ({ key, values }))
      .sort(({ key: k1 }, { key2: k2 }) =>
        normalizeOtpName(k1) === PACK_OPTION_NORMALIZE
          ? -1
          : normalizeOtpName(k2) === PACK_OPTION_NORMALIZE
          ? 1
          : k1 - k2
      )
      .map(({ key, values }) => {
        const removedOptions = getRemovedOptionsFromTags($product.tags)

        if (!removedOptions) {
          return { key, values }
        }

        return {
          key,
          values: values.filter(
            (value) => !removedOptions.includes(String(value))
          ),
        }
      })
  )

  const perPiecePrice = derived(options, ($options) =>
    Boolean(
      Object.keys($options).find(
        (opt) => normalizeOtpName(opt) === PACK_OPTION_NORMALIZE
      )
    )
  )

  return {
    ...product,
    productOptions,
    options,
    availableVariants,
    optionsArr,
    optionsIndex,
    subscriptions,
    sortedSubscriptions,
    hasSubscription,
    maxSubscription,
    perPiecePrice,
  }
}
