/* eslint-disable react/no-multi-comp */
import React from "react"
import ModalTrialButton from "./"
import { VARIANT_APPLY, VARIANT_CANCEL } from "./ModalTrialButton"

export default {
  title: "CheckoutSuccess/components/ModalTrialButton",
  component: ModalTrialButton,
}

export const VariantApply = (args) => (
  <ModalTrialButton variant={VARIANT_APPLY} {...args}>
    apply
  </ModalTrialButton>
)

export const VariantCancel = (args) => (
  <ModalTrialButton variant={VARIANT_CANCEL} {...args}>
    cancel
  </ModalTrialButton>
)
