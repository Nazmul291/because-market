import React from "react"
import AccountProductDetails from "./"
import productWithSubscriptions from "../__mocks__/productWithSubscriptions"

export default {
  title: "rUI/AccountProductDetails",
  component: AccountProductDetails,
}

const Template = (args) => <AccountProductDetails {...args} />

export const Default = Template.bind({})
Default.args = {
  product: productWithSubscriptions,
  formFooter: () => <div>formFooter</div>,
  footer: () => <div>Footer</div>,
}
