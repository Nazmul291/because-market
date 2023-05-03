import {
  encodeId,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
  makePatchRequest,
} from "../utils"

export const checkoutPreview = (checkoutId) =>
  makePostRequest(
    `${process.env.PERCHE_API_URL}/purchase/${encodeId(checkoutId)}/preview`
  )

export const addToNextBox = (checkoutId) =>
  makePostRequest(
    `${process.env.PERCHE_API_URL}/purchase/${encodeId(checkoutId)}/user`,
    {
      addToExists: true,
    }
  )

export const buyNow = (checkoutId) =>
  makePostRequest(
    `${process.env.PERCHE_API_URL}/purchase/${encodeId(checkoutId)}/user`,
    {
      addToExists: false,
    }
  )

export const partnerCreateCheckout = ({ id, linkType }) =>
  makePostRequest(`${process.env.PERCHE_API_URL}/partners/checkout`, {
    id,
    linkType,
  })

export const getBillingInfo = () =>
  makeGetRequest(`${process.env.PERCHE_API_URL}/account/billing`)

export const updateBillingToken = (token) =>
  makePutRequest(`${process.env.PERCHE_API_URL}/account/billing`, { token })

export const validatePromoCode = (code, data) =>
  makePostRequest(
    `${process.env.PERCHE_API_URL}/coupons/${code}/validate`,
    data
  )

export const getSubscriptions = () =>
  makeGetRequest(`${process.env.PERCHE_API_URL}/subscriptions`)

/**
 * Create user
 * @param {Object} info info
 * @param {String} info.email email
 * @param {String} info.firstName firstName
 * @param {String} info.lastName lastName
 * @param {String} info.phone phone
 * @param {Boolean} info.smsNotification smsNotification
 * @param {Object} info.shippingAddress shippingAddress
 * @param {String} info.shippingAddress.address1 address1
 * @param {String} [info.shippingAddress.apt] apt
 * @param {String} info.shippingAddress.city city
 * @param {String} info.shippingAddress.country country
 * @param {String} info.shippingAddress.province province
 * @param {String} info.shippingAddress.zip zip
 * @returns {Promise}
 */
export const createCheckoutUser = (info) =>
  makePostRequest(`${process.env.PERCHE_API_URL}/account`, info)

export const getOrdersTracking = () =>
  makeGetRequest(`${process.env.PERCHE_API_URL}/orders/tracking`)

export const loginUserByZipAndPhone = ({ zip, lastFourDigitsPhone }) =>
  makeGetRequest(
    `${process.env.PERCHE_API_URL}/auth/token/${lastFourDigitsPhone}/${zip}`
  )

export const loadProfile = () =>
  makeGetRequest(`${process.env.PERCHE_API_URL}/account/profile`)

export const getNextShipment = () =>
  makePostRequest(`${process.env.PERCHE_API_URL}/account/shipment/next`)

export const nextShipmentPostpone = ({ days, code }) =>
  makePostRequest(
    `${process.env.PERCHE_API_URL}/account/shipment/next/postpone`,
    { days, code }
  )

export const changeSubscriptionDate = (date) =>
  makePutRequest(`${process.env.PERCHE_API_URL}/v2/subscriptions/billdate`, {
    date,
  })

export const updateSubscriptionById = (
  subscriptionId,
  { variantID, quantity, intervalType }
) =>
  makePutRequest(
    `${process.env.PERCHE_API_URL}/subscriptions/${subscriptionId}`,
    { variantID, quantity, intervalType }
  )

export const deleteSubscriptionById = (subscriptionId) =>
  makeDeleteRequest(
    `${process.env.PERCHE_API_URL}/subscriptions/${subscriptionId}`
  )

/**
 * Apply coupon to account
 * @param {String} couponCode code
 * @returns {Promise}
 */
export const accountApplyCoupon = (couponCode) =>
  makePostRequest(`${process.env.PERCHE_API_URL}/account/coupons`, {
    couponCode,
  })

/**
 * Create checkout
 * @param {Object} checkout checkout
 * @returns {Promise<Object>} New checkout
 */
export const checkoutCreate = (checkout) =>
  makePostRequest(`${process.env.PERCHE_API_URL}/checkouts/create`, checkout)

/**
 * Load checkout by id
 * @param {String} checkoutId checkout id
 * @returns {Promise<Object>} checkout
 */
export const checkoutLoadById = (checkoutId) =>
  makeGetRequest(`${process.env.PERCHE_API_URL}/checkouts/${checkoutId}`)

/**
 * Update checkout
 * @param {String} checkoutId checkout id
 * @param {Object} updates updates data
 * @returns {Promise<Object>} updated checkout
 */
export const checkoutUpdateById = (checkoutId, updates) =>
  makePatchRequest(
    `${process.env.PERCHE_API_URL}/checkouts/${checkoutId}`,
    updates
  )
