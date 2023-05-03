import base64 from "base-64"
import { decodeId, isStorefrontId } from "../utils"

export function getStorefrontProductVariantId(productVariantId) {
  return isStorefrontId(productVariantId)
    ? productVariantId
    : base64.encode(`gid://shopify/ProductVariant/${productVariantId}`)
}

export function getVariantIdFromCheckoutLineItemId(checkoutId, lineItemId) {
  return isStorefrontId(lineItemId)
    ? lineItemId
    : base64.encode(
        `gid://shopify/CheckoutLineItem/${lineItemId}?checkout=${checkoutId}`
      )
}

export function getVariantIdFromCheckoutLineItemVariantId(lineItemVariantId) {
  const decodeString = decodeId(lineItemVariantId)
  return decodeString.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/)[1]
}
