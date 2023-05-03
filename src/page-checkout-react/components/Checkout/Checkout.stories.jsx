/* eslint-disable react/no-multi-comp */
import React from "react"
import checkoutWithoutAddress from "../../../rUI/__mocks__/checkoutWithoutAddress"
import Checkout from "./"
import CheckoutTitle from "./CheckoutTitle"

export default {
  title: "Checkout/components/Checkout",
  component: Checkout,
}

const Template = (args) => <Checkout {...args} />

export const Default = Template.bind({})
Default.args = {
  checkout: checkoutWithoutAddress,
}

export const Title = (args) => <CheckoutTitle {...args} />
Title.args = {
  step: 1,
}
