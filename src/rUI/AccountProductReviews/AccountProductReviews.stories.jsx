import React from "react"
import AccountProductReviews from "./"
import productWithMetaReviews from "../__mocks__/productWithMetaReviews"

export default {
  title: "rUI/AccountProductReviews",
  component: AccountProductReviews,
}

export const fromMeta = () => (
  <AccountProductReviews product={productWithMetaReviews} />
)
