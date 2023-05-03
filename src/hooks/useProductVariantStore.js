import { useCallback, useMemo, useState } from "react"
import { PRODUCT_PACK_SIZE_OPTION } from "../const"
import { findVariantByOptions, groupVariantByOptions } from "../utils"

const EXCLUDE_OPTION_IF_ONE = ["Title"]

function useProductStore(p) {
  const [product, setProduct] = useState(p)

  const productOptions = useMemo(() => {
    if (product?.options.length !== 1) {
      return product?.options || []
    }

    return (
      product?.options.filter(
        (option) => !EXCLUDE_OPTION_IF_ONE.some((o) => o === option)
      ) || []
    )
  }, [product])

  const optionsIndex = useMemo(
    () =>
      productOptions.reduce(
        (acc, option, index) => ({ ...acc, [option]: index }),
        {}
      ),
    [productOptions]
  )

  const subscriptions = useMemo(
    () => product?.metafields?.subscription || {},
    [product]
  )

  const sortedSubscriptions = useMemo(
    () =>
      Object.entries(subscriptions)
        .sort((a, b) => b[1] - a[1])
        .map(([key, value]) => ({ key, value })),
    [subscriptions]
  )

  const maxSubscription = useMemo(
    () => sortedSubscriptions[0],
    [sortedSubscriptions]
  )

  const hasSubscription = useMemo(
    () => Object.keys(subscriptions).length > 0,
    [subscriptions]
  )

  const options = useMemo(
    () => groupVariantByOptions(productOptions, product?.variants),
    [product, productOptions]
  )

  const optionsArr = useMemo(
    () =>
      Object.entries(options)
        .map(([key, values]) => ({ key, values }))
        .sort(({ key: k1 }, { key2: k2 }) =>
          k1 === PRODUCT_PACK_SIZE_OPTION
            ? -1
            : k2 === PRODUCT_PACK_SIZE_OPTION
            ? 1
            : k1 - k2
        ),
    [options]
  )

  const showQuantity = useMemo(
    () => !options[PRODUCT_PACK_SIZE_OPTION],
    [options]
  )

  return useMemo(
    () => ({
      product,
      setProduct,
      productOptions,
      optionsIndex,
      subscriptions,
      sortedSubscriptions,
      maxSubscription,
      hasSubscription,
      options,
      optionsArr,
      showQuantity,
    }),
    [
      product,
      productOptions,
      optionsIndex,
      subscriptions,
      sortedSubscriptions,
      maxSubscription,
      hasSubscription,
      options,
      optionsArr,
      showQuantity,
    ]
  )
}

function useCurrentVariantStore({ productStore, quantity }) {
  const { product, optionsIndex, subscriptions } = productStore

  const [currentVariant, setCurrentVariant] = useState(product?.variants[0])
  const [subscription, setSubscription] = useState(null)

  const setCurrentVariantByOptions = useCallback(
    (options) => {
      setCurrentVariant(
        findVariantByOptions(options, product.variants, optionsIndex)
      )
    },
    [product, optionsIndex]
  )

  const subscriptionDiscount = useMemo(() => {
    return subscriptions[subscription] || 0
  }, [subscriptions, subscription])

  const groupedOption = useMemo(() => {
    if (!currentVariant || !product?.options.length) {
      return {}
    }

    return product.options.reduce((acc, opt, i) => {
      if (!currentVariant.options) {
        return acc
      }

      acc[opt] = currentVariant.options[i]
      return acc
    }, {})
  }, [currentVariant, product])

  const price = useMemo(
    () =>
      !currentVariant ? 0 : parseFloat(currentVariant.price.amount) * quantity,
    [currentVariant, quantity]
  )

  const finalPrice = useMemo(() => {
    return !subscriptionDiscount
      ? price
      : price * (1 - subscriptionDiscount / 100)
  }, [price, subscriptionDiscount])

  return useMemo(
    () => ({
      currentVariant,
      setCurrentVariant,
      setCurrentVariantByOptions,
      subscription,
      setSubscription,
      subscriptionDiscount,
      groupedOption,
      price,
      finalPrice,
    }),
    [
      currentVariant,
      subscription,
      subscriptionDiscount,
      groupedOption,
      price,
      finalPrice,
      setCurrentVariantByOptions,
    ]
  )
}

function useDiscountStore({ productStore, currentVariantStore }) {
  const { maxSubscription } = productStore
  const { subscriptionDiscount, price } = currentVariantStore

  const discount = useMemo(() => {
    return subscriptionDiscount
      ? subscriptionDiscount
      : maxSubscription
      ? maxSubscription.value
      : 0
  }, [maxSubscription, subscriptionDiscount])

  const subscribePrice = useMemo(
    () => price * (1 - discount / 100),
    [price, discount]
  )

  return useMemo(
    () => ({ discount, subscribePrice }),
    [discount, subscribePrice]
  )
}

export function useProductVariantStore(product) {
  const [quantity, setQuantity] = useState(1)
  const productStore = useProductStore(product)
  const currentVariantStore = useCurrentVariantStore({
    productStore,
    quantity,
  })
  const discountStore = useDiscountStore({ productStore, currentVariantStore })

  return useMemo(
    () => ({
      quantity,
      setQuantity,
      productStore,
      currentVariantStore,
      discountStore,
    }),
    [quantity, productStore, currentVariantStore, discountStore]
  )
}
