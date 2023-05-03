import React from "react"
import AccountPDP from "./"
import productWithSubscriptions from "../../../rUI/__mocks__/productWithSubscriptions"
import productWithBuyNowTag from "../../../rUI/__mocks__/productWithBuyNowTag"

export default {
  title: "Account-Page/components/AccountPDP",
  component: AccountPDP,
}

const Template = (args) => <AccountPDP {...args} />

export const WithSubscription = Template.bind({})
WithSubscription.args = {
  product: productWithSubscriptions,
  selectedVariantId: productWithSubscriptions.variants[0].id,
  quantity: 20,
}

export const WithByNowTag = Template.bind({})
WithByNowTag.args = {
  product: productWithBuyNowTag,
  selectedVariantId: productWithBuyNowTag.variants[0].id,
}

export const WithoutQuantity = Template.bind({})
WithoutQuantity.args = {
  product: productWithBuyNowTag,
  selectedVariantId: productWithBuyNowTag.variants[0].id,
  showQuantity: false,
}
