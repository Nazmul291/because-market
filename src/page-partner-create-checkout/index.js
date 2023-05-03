import { partnerCreateCheckout } from "../api/marketApi"
import { CHECKOUT_ID_QUERY } from "../const"

const query = new URLSearchParams(location.search)

const id = query.get("id")
const linkType = query.get("type")

if (id && linkType) {
  partnerCreateCheckout({ id, linkType }).then((res) => {
    const checkoutId = res?.checkoutID

    if (!checkoutId) {
      return Promise.reject("CheckoutId not found")
    }

    const nextQuery = new URLSearchParams()
    nextQuery.set(CHECKOUT_ID_QUERY, checkoutId)

    location.href = `/pages/checkout?${nextQuery.toString()}`
  })
}
