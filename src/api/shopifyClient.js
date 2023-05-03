import Client from "shopify-buy"
import { CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION } from "../const"

export const shopifyClient = Client.buildClient({
  domain: process.env.STORE_DOMAIN,
  storefrontAccessToken: process.env.STOREFRONT_TOKEN,
})

/**
 * Creating checkout
 * @returns {Object} -
 */
export const createCheckoutForVariant = ({ variant, subscription, quantity }) =>
  shopifyClient.checkout.create({
    lineItems: [
      {
        variantId: variant.id,
        quantity,
        customAttributes: !subscription
          ? []
          : [
              {
                key: CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
                value: subscription.key,
              },
            ],
      },
    ],
  })
