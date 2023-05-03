import React from "react"
import CheckoutLoginModal from "./"

export default {
  title: "Checkout/components/CheckoutLoginModal",
  component: CheckoutLoginModal,
}

const Template = (args) => <CheckoutLoginModal {...args} />

export const Default = Template.bind({})
Default.args = {
  error: null,
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
}

export const Error = Template.bind({})
Error.args = {
  loading: false,
  error: "Error text",
}
