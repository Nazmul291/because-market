export const ATTENTIVE_PURCHASE = "attentive_purchase"

export function getAttentiveInstance() {
  return new Promise((rs, rj) => {
    // Global Attentive comes from dynamic gtm loading so need to wait for it
    function check(reqCount = 0) {
      if (window.attentive) {
        return rs(window.attentive)
      }

      if (reqCount > 20) {
        return rj(new Error("window.attentive not loaded"))
      }

      setTimeout(() => check(reqCount + 1), 100)
    }

    check()
  })
}

export function trackAttentivePurchase(checkout = {}) {
  return getAttentiveInstance()
    .then((attentive) => {
      const { email, shippingAddress } = checkout

      const items = checkout.items?.map(
        ({
          productId,
          id: productVariantId,
          imageURL: productImage,
          title: name,
          price,
          quantity,
          sku,
        }) => ({
          productId,
          productVariantId,
          productImage,
          name,
          price: {
            value: price,
            currency: "USD",
          },
          quantity,
          // category: product.product_type || '', // Todo Missing variable from shopify
          sku,
        })
      )

      attentive.analytics.purchase({
        items,
        order: {
          orderId: checkout.id,
        },
        user: {
          phone: shippingAddress.phone,
          email,
        },
      })

      localStorage.setItem(ATTENTIVE_PURCHASE, "true")
    })
    .catch((e) => {
      console.error(`Error in tracking Attentive Purchase: ${e}`)
    })
}

export function trackAttentivePurchaseOnce(checkout = {}) {
  const hasTrackAttentivePurchase = localStorage.getItem(ATTENTIVE_PURCHASE)
  if (!hasTrackAttentivePurchase) {
    trackAttentivePurchase(checkout)
  }
}
