import mixpanel from "./mixpanel"

export const TYPE_MIXPANEL = "mixpanel"
export const TYPE_SEGMENT = "segment"
export const FB_CAPI_PURCHASE = "fb_capi_purchase"

export function trackEvent(eventName, args) {
  const { origin, pathname } = window
  // eslint-disable-next-line no-console
  console.log(`${eventName} tracked`)

  mixpanel.track(eventName, {
    funnelType: "store2",
    funnel: `${origin}/${pathname}`,
    ...args,
  })
}

const getItemInfo = (items, itemInfo) => {
  try {
    return items.map((item) => item[itemInfo]).join("; ")
  } catch (e) {
    return ""
  }
}

const fetchIp = async () => {
  try {
    let request = await fetch("https://api.ipify.org/?format=json")
    let data = await request.json()
    return data.ip
  } catch (e) {
    console.error(e)
    return ""
  }
}

export async function fbPurchase(checkout) {
  const { id } = checkout
  let purchaseId = `${FB_CAPI_PURCHASE}-${id}`
  const hasFbPurchase = localStorage.getItem(purchaseId)
  if (hasFbPurchase) {
    return
  }
  localStorage.setItem(purchaseId, "true")
  try {
    if (window.analytics) {
      const { analytics: segment, navigator } = window
      const {
        shippingAddress: {
          phone,
          lastname,
          firstname,
          city,
          state,
          zip,
          country,
        },
        items,
        total,
      } = checkout

      let ip_address = await fetchIp()
      await segment.track("Facebook Purchase Event", {
        fb_actionsource: "website",
        event_id: id,
        currency: "USD",
        email: checkout.email,
        phone,
        firstname,
        lastname,
        address: {
          city,
          state,
          zip,
        },
        location: {
          country,
        },
        products: items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        productSku: getItemInfo(items, "sku"),
        productName: getItemInfo(items, "title"),
        ip_address,
        userAgent: navigator.userAgent,
        total,
      })
    }
  } catch (e) {
    console.error(`Error in fb segment. Error: ${e}`)
  }
}
