import React from "react"
import AccountProductDescription from "./"
import productWithSubscriptions from "../__mocks__/productWithSubscriptions"

export default {
  title: "rUI/AccountProductDescription",
  component: AccountProductDescription,
}

export const withHTML = () => (
  <AccountProductDescription product={productWithSubscriptions} />
)
