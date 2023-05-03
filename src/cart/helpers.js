import {
  CART_DISCOUNTS_QUERY,
  CART_VARIANTS_QUERY,
  CHECKOUT_CUSTOM_ATTRIBUTE_DISCOUNTS,
  CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
  CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES,
} from "../const"
import { getUTMParams } from "../integrations/utm"
import { getStorefrontProductVariantId, isEmptyObject } from "../utils"

/**
 * Transform object to custom attribute array
 * @param {Object} obj object
 * @returns {Array.<key, value>} custom attribute array
 */
function transformObjectToCustomAttribute(obj) {
  if (isEmptyObject(obj)) {
    return []
  }
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value: value.toString(),
  }))
}

/**
 * Return checkout custom attribute from cart
 * @param {Object} cart cart
 * @returns {Array} array of custom attributes
 */
export function cartCheckoutCustomAttribute(cart) {
  const customAttributes = [
    {
      key: CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES,
      value: "true",
    },
  ]

  const discounts = cart.items
    .map((item) => item.properties?.subscription?.coupon)
    .filter((i) => Boolean(i))
    .join(",")

  if (discounts) {
    customAttributes.push({
      key: CHECKOUT_CUSTOM_ATTRIBUTE_DISCOUNTS,
      value: discounts,
    })
  }

  const firstWithUTM = cart.items.find((item) => Boolean(item.properties?.utm))

  if (firstWithUTM) {
    transformObjectToCustomAttribute(firstWithUTM.properties.utm).forEach(
      (item) => customAttributes.push(item)
    )
  }

  return customAttributes
}

/**
 * Return checkout line items from cart
 * @param {Object} cart cart
 * @returns {Array} checkout line items
 */
export function cartCheckoutLineItems(cart) {
  return cart.items.map(({ id, quantity, properties }) => {
    const subscription = properties?.subscription
    const customAttributes = !subscription
      ? []
      : [
          {
            key: CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
            value: subscription.key,
          },
        ]

    return {
      variantId: getStorefrontProductVariantId(id),
      quantity,
      customAttributes,
    }
  })
}

/**
 * Return object from cart for create checkout
 * @param {Object} cart cart
 * @returns {Object} object from cart for create checkout
 */
export function cartCheckout(cart) {
  return {
    lineItems: cartCheckoutLineItems(cart),
    customAttributes: cartCheckoutCustomAttribute(cart),
  }
}

/**
 * Return object for create checkout from url query
 * @returns {Object|null} object from url query for create checkout
 */
export function queryStringCheckout() {
  const params = new URLSearchParams(location.search)
  const variants = params.get(CART_VARIANTS_QUERY)
  const hasVariantsQuery = variants && variants.length > 0

  if (!hasVariantsQuery) {
    return null
  }

  const customAttributes = []
  const discountsQuery = params.get(CART_DISCOUNTS_QUERY)?.trim()
  const utm = getUTMParams()

  const lineItems = variants.split(",").map((itemStr) => {
    const [variantId, quantity = 1, subscriptionValue = ""] = itemStr.split(":")

    return {
      variantId: getStorefrontProductVariantId(variantId),
      quantity: quantity ? parseInt(quantity, 10) : 1,
      customAttributes: !subscriptionValue
        ? []
        : [
            {
              key: CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
              value: subscriptionValue,
            },
          ],
    }
  })

  if (discountsQuery) {
    customAttributes.push({
      key: CHECKOUT_CUSTOM_ATTRIBUTE_DISCOUNTS,
      value: discountsQuery,
    })
  }

  if (utm) {
    transformObjectToCustomAttribute(utm).forEach((item) =>
      customAttributes.push(item)
    )
  }

  return {
    lineItems,
    customAttributes,
  }
}
