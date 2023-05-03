/* eslint-disable no-warning-comments */
/* Google Tag Manager Events*/

export function buildCheckoutDataEvent(checkout = {}) {
  if (checkout) {
    const { id, items, total, email, shippingAddress, type } = checkout
    let orderValue = total

    try {
      return {
        orderValue,
        trialPrice: orderValue,
        customerId: email, // TODO: Need recurly account id passed in here but no recurly data on checkout/thankyou
        customerEmail: email,
        customerFirstName: shippingAddress.firstname,
        customerLastName: shippingAddress.lastname,
        customerPhoneNumber: shippingAddress.phone,
        orderId: id,
        purchaseType: type ? "subscription" : "onetime", // TODO: Dynamically switch onetime/sub when funnel is in
        checkoutItems: items.map(({ price: total, sku, quantity }) => ({
          subTotal: total,
          sku,
          quantity,
        })),
        checkoutItemNames: items.map(({ title, sku }) => title || sku || ""),
      }
    } catch (e) {
      console.error(`Error in building purchase data. Error: ${e}`)
      return {}
    }
  }
}

export function createPurchaseDataEvent(eventName = "purchase", checkout = {}) {
  if (window.dataLayer && checkout) {
    let purchaseData = buildCheckoutDataEvent(checkout)
    window.dataLayer.push({
      event: eventName,
      ...purchaseData,
    })
  }
}
