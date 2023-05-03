/* eslint-disable react/prop-types */
import React from "react"
import CheckoutOrderSummaryList, { CheckoutOrderSummaryListItem } from "./"

export default {
  title: "CheckoutSuccess/components/CheckoutOrderSummaryList",
  component: CheckoutOrderSummaryList,
}

export const Default = ({ head, tail }) => (
  <CheckoutOrderSummaryList>
    <CheckoutOrderSummaryListItem head={head} tail={tail} isMonthly={false} />
  </CheckoutOrderSummaryList>
)
Default.args = {
  head: "Head",
  tail: "Tail",
}
