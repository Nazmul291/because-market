import { makePostRequest } from "../utils"

const PATH_V2 = `${process.env.PERCHE_API_URL}/v2`

/**
 * Purchase checkout
 * @param {String} checkoutId checkout id
 * @param {Object} data purchase data
 * @returns {Promise}
 */
export const purchaseCheckoutCreate = (checkoutId, data) =>
  makePostRequest(`${PATH_V2}/purchase/${checkoutId}`, data)
