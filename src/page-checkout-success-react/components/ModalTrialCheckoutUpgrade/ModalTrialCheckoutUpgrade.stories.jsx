import React from "react"
import productWithSelectPackSize from "../../../rUI/__mocks__/productWithSelectPackSize"
import ModalTrialCheckoutUpgrade from "./"

export default {
  title: "CheckoutSuccess/components/ModalTrialCheckoutUpgrade",
  component: ModalTrialCheckoutUpgrade,
}

export const Default = (args) => <ModalTrialCheckoutUpgrade {...args} />
Default.args = {
  product: productWithSelectPackSize,
  selectedVariantId:
    "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MzQxMDAwNDE0ODQ0OQ==",
  quantity: 1,
  discount: 40,
}
