import React from "react"
import AccountPDPEdit from "./"
import withSubscriptions from "../../../rUI/__mocks__/productWithSubscriptions"

export default {
  title: "Account-Page/components/AccountPDPEdit",
  component: AccountPDPEdit,
}

const Template = (args) => <AccountPDPEdit {...args} />

export const WithSubscription = Template.bind({})
WithSubscription.args = {
  product: withSubscriptions,
  selectedVariantId: withSubscriptions.variants[0].id,
}
