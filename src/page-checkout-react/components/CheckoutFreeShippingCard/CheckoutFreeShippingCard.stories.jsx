import React from "react"
import CheckoutFreeShippingCard from "./"

export default {
  title: "Checkout/components/CheckoutFreeShippingCard",
  component: CheckoutFreeShippingCard,
}

const Template = (args) => <CheckoutFreeShippingCard {...args} />
export const Default = Template.bind({})
Default.args = {
  amount: 1000,
}
