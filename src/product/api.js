export const addToCart = (id, quantity, properties) =>
  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          quantity,
          id,
          properties,
        },
      ],
    }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)))

export const createSubCoupon = (product, variant, key) => {
  const item = {
    productID: product.id,
    variants: [
      {
        id: variant.id,
        sku: variant.sku,
        key,
        namespace: "subscription",
      },
    ],
  }

  return fetch(`${process.env.PERCHE_API_URL}/coupon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productCoupons: [item],
    }),
  }).then((res) =>
    res.ok ? res.json().then(([coupon]) => coupon) : Promise.reject(res)
  )
}
