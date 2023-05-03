import { GraphQLClient } from "graphql-request"
import { STOREFRONT_API_URL } from "../const"
import {
  decodeId,
  flattenQueryResult,
  getStorefrontProductId,
  getStorefrontProductVariantId,
  groupMetafields,
} from "../utils"

import queryGetWeeklyOffers from "./storefrontGraphQL/queryGetWeeklyOffers.graphql"
import queryProductNameWithVariants from "./storefrontGraphQL/queryProductNameWithVariants.graphql"
import queryGetProductsFromCollection from "./storefrontGraphQL/queryGetProductsFromCollection.graphql"
import queryGetProductIdsFromCollection from "./storefrontGraphQL/queryGetProductIdsFromCollection.graphql"
import queryProductMetaFields from "./storefrontGraphQL/queryProductMetaFields.graphql"
import queryProductTags from "./storefrontGraphQL/queryProductTags.graphql"
import queryProduct from "./storefrontGraphQL/queryProduct.graphql"
import mutationCheckoutEmailUpdateV2 from "./storefrontGraphQL/mutationCheckoutEmailUpdateV2.graphql"
import mutationCheckoutShippingLineUpdate from "./storefrontGraphQL/mutationCheckoutShippingLineUpdate.graphql"

const client = new GraphQLClient(STOREFRONT_API_URL, {
  headers: {
    // eslint-disable-next-line quote-props
    accept: "application/json",
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": process.env.STOREFRONT_TOKEN,
  },
})

const makeStorefrontGraphQLRequest = (query, variables) =>
  client.request(query, variables).then((data) => {
    return flattenQueryResult(data)
  })

export const checkoutEmailUpdateV2 = ({ checkoutId = "", email = "" }) =>
  makeStorefrontGraphQLRequest(mutationCheckoutEmailUpdateV2, {
    checkoutId,
    email,
  }).then(({ checkoutEmailUpdateV2 }) => checkoutEmailUpdateV2)

export const checkoutShippingLineUpdate = ({
  checkoutId = "",
  shippingRateHandle = "",
}) =>
  makeStorefrontGraphQLRequest(mutationCheckoutShippingLineUpdate, {
    checkoutId,
    shippingRateHandle,
  }).then(({ checkoutShippingLineUpdate }) => checkoutShippingLineUpdate)

export const fetchProductMetafields = (id) => {
  return makeStorefrontGraphQLRequest(queryProductMetaFields, {
    id: getStorefrontProductId(id),
  }).then(({ product }) => {
    if (!product || !product.metafields) {
      return null
    }

    return groupMetafields(product.metafields)
  })
}

export const fetchWeeklyOffers = () =>
  makeStorefrontGraphQLRequest(queryGetWeeklyOffers)

export const fetchCheckoutCrossSellProductIds = (
  checkout,
  metaNamespace = "cross_sell"
) => {
  const checkoutProductIdsSet = new Set(
    checkout?.items?.map(({ productId }) => getStorefrontProductId(productId))
  )
  const checkoutProductIds = [...checkoutProductIdsSet]

  if (!checkoutProductIds || !checkoutProductIds.length) {
    return Promise.resolve()
  }

  const queries = checkoutProductIds.map((id) => {
    return fetchProductMetafields(id)
  })

  return Promise.all(queries)
    .then((metas) => {
      return [
        ...metas.reduce((acc, meta) => {
          if (!meta || !meta[metaNamespace]) {
            return acc
          }

          meta[metaNamespace]?.products?.forEach((item) =>
            acc.add(decodeId(item))
          )

          return acc
        }, new Set()),
      ]
    })
    .then((subProductIds) => {
      return subProductIds.filter((id) => !checkoutProductIdsSet.has(id))
    })
}

export const fetchProductNameWithVariants = (productId) =>
  makeStorefrontGraphQLRequest(queryProductNameWithVariants, {
    productId: getStorefrontProductId(productId),
  })

export const fetchProductNameWithSpecificVariant = (productId, variantId) =>
  fetchProductNameWithVariants(productId).then(({ product }) => {
    const pureProduct = flattenQueryResult(product)
    const storeFrontVariantId = getStorefrontProductVariantId(variantId)

    return {
      ...pureProduct,
      variants: pureProduct?.variants.filter(
        (v) => v.id === storeFrontVariantId
      ),
    }
  })

/**
 * Fetch product by product ID
 * @param {String} productId product id
 * @returns {Object} product
 */
export const fetchProduct = (productId) =>
  makeStorefrontGraphQLRequest(queryProduct, {
    id: getStorefrontProductId(productId),
  })

/**
 * Load products on collection name
 * @param {String} handle Collection name
 * @param {Number} limit product count
 * @returns {Array} products on collection
 */
export const fetchProductsFromCollection = (handle, limit) =>
  makeStorefrontGraphQLRequest(queryGetProductsFromCollection, {
    handle,
    limit,
  }).then(({ collection }) =>
    collection?.products?.map((product) => ({
      ...product,
      metafields: groupMetafields(product.metafields),
    }))
  )

/**
 * Load product ids from collection name
 * @param {String} handle Collection name
 * @param {Number} limit product count
 * @returns {Array} storefront product ids on collection
 */
export const fetchProductIdsFromCollection = (handle, limit) =>
  makeStorefrontGraphQLRequest(queryGetProductIdsFromCollection, {
    handle,
    limit,
  }).then(({ collection }) => collection?.products?.map(({ id }) => id))

/**
 * Fetch product tags
 * @param {String} productId product id
 * @returns {Array} return product tags
 */
export const fetchProductTags = (productId) =>
  makeStorefrontGraphQLRequest(queryProductTags, {
    id: getStorefrontProductId(productId),
  }).then(({ product = {} }) => product?.tags)

/**
 * Fetch products metafield
 * @param {Array} productIds product ids
 * @returns {Object} map of product metafield by id
 */
export const fetchProductsMetafields = (productIds = []) => {
  return Promise.all(
    productIds.map((id) =>
      fetchProductMetafields(id).then((res) => ({ [id]: res }))
    )
  ).then((res) => res.reduce((acc, item) => ({ ...acc, ...item }), {}))
}
