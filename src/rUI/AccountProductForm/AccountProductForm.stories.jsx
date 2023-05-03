import React from "react"
import AccountProductForm from "./"
import withSubscriptionsProduct from "../__mocks__/productWithSubscriptions"
import withManyOptions from "../__mocks__/productWithManyOptions"

export default {
  title: "rUI/AccountProductForm",
  component: AccountProductForm,
}

const Template = (args) => <AccountProductForm {...args} />

export const Default = Template.bind({})
Default.args = {
  product: withSubscriptionsProduct,
  footer: () => <div>Footer</div>,
}

export const WithoutQuantity = Template.bind({})
WithoutQuantity.args = {
  showQuantity: false,
  product: withSubscriptionsProduct,
  footer: () => <div>Footer</div>,
}

export const WithManyOptions = Template.bind({})
WithManyOptions.args = {
  showQuantity: false,
  product: withManyOptions,
  footer: () => <div>Footer</div>,
}
