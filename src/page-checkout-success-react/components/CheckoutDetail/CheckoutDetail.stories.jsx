import React from "react"
import checkout from "../../../rUI/__mocks__/checkout"
import CheckoutDetail from "./"

export default {
  title: "CheckoutSuccess/components/CheckoutDetail",
  component: CheckoutDetail,
}

const Template = (args) => <CheckoutDetail {...args} />

export const Default = Template.bind({})
Default.args = {
  checkout: checkout,
}
