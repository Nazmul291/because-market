import React from "react"
import CheckoutCrossSellProductCard from "./"
import product from "../../../rUI/__mocks__/productWithSubscriptions"

export default {
  title: "Checkout/components/CheckoutCrossSellProductCard",
  component: CheckoutCrossSellProductCard,
}

const Template = (args) => <CheckoutCrossSellProductCard {...args} />

export const Default = Template.bind({})
Default.args = {
  product: product,
}
