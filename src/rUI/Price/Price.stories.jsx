/* eslint-disable react/no-multi-comp */
import React from "react"
import Price from "./"

export default {
  title: "rUI/Price",
  component: Price,
}

export const PositiveAmountV2 = (args) => <Price {...args} />
PositiveAmountV2.args = {
  amountV2: 10,
}

export const NegativeAmountV2 = (args) => <Price {...args} />
NegativeAmountV2.args = {
  amountV2: -10,
}
