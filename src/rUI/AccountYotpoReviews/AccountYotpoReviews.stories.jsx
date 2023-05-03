import React from "react"
import AccountYotpoReviews from "./"

export default {
  title: "rUI/AccountYotpoReviews",
  component: AccountYotpoReviews,
}

const Template = (args) => <AccountYotpoReviews {...args} />

export const Default = Template.bind({})
Default.args = {
  productId: "4862323425350",
  productTitle: "Product Title",
}
