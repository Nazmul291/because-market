import React, { useState } from "react"
import CheckoutShippingAddressForm from "./"

export default {
  title: "Checkout/components/CheckoutShippingAddressForm",
  component: CheckoutShippingAddressForm,
}

const Template = (args) => {
  const [address, setAddress] = useState({})

  return (
    <CheckoutShippingAddressForm
      {...args}
      shippingAddress={address}
      onChange={setAddress}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  checkoutErrors: null,
}
