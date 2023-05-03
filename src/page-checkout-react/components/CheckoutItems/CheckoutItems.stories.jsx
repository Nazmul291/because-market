import React from "react"
import CheckoutWithoutAddress from "../../../rUI/__mocks__/checkoutWithoutAddress"
import CheckoutItems from "./"

export default {
  title: "Checkout/components/CheckoutItems",
  component: CheckoutItems,
}

const Template = (attr) => <CheckoutItems {...attr} />

export const WithoutAddress = Template.bind({})
WithoutAddress.args = {
  checkout: CheckoutWithoutAddress,
}
