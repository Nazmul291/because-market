import React from "react"
import AccountProductGallery from "./"
import productWithSubscriptions from "../__mocks__/productWithSubscriptions"

export default {
  title: "rUI/AccountProductGallery",
  component: AccountProductGallery,
}

const Template = (args) => <AccountProductGallery {...args} />

export const Default = Template.bind({})
Default.args = {
  images: productWithSubscriptions.images,
}
