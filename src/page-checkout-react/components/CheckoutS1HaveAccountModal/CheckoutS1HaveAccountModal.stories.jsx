import React from "react"
import CheckoutS1HaveAccountModal from "./"

export default {
  title: "Checkout/components/CheckoutS1HaveAccountModal",
  component: CheckoutS1HaveAccountModal,
}

const Template = (args) => <CheckoutS1HaveAccountModal {...args} />

export const Default = Template.bind({})
Default.args = {
  email: "bob@marly.com",
}
