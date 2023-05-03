import React from "react"
import CheckoutTimeline from "./"

export default {
  title: "Checkout/components/CheckoutTimeline",
  component: CheckoutTimeline,
}

const Template = (args) => <CheckoutTimeline {...args} />

export const Default = Template.bind({})
Default.args = {
  step: 1,
}
