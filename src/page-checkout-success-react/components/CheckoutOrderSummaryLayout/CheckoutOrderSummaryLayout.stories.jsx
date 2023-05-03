/* eslint-disable react/no-multi-comp */
import React from "react"
import CheckoutOrderSummaryList, {
  CheckoutOrderSummaryListItem,
} from "../CheckoutOrderSummaryList"
import CheckoutOrderSummaryLayout from "./"

export default {
  title: "CheckoutSuccess/components/CheckoutOrderSummaryLayout",
  component: CheckoutOrderSummaryLayout,
}

export const Default = (arg) => (
  <CheckoutOrderSummaryLayout {...arg}>Hello</CheckoutOrderSummaryLayout>
)
Default.args = {
  title: "Title",
  subTitle: "Sub Title",
  footer: "Footer",
}

export const WithBody = (arg) => <CheckoutOrderSummaryLayout {...arg} />
WithBody.args = {
  title: "Title",
  body: <div>Body</div>,
  subTitle: "Sub Title",
  footer: "Footer",
}

export const WithList = (arg) => (
  <CheckoutOrderSummaryLayout {...arg}>
    <CheckoutOrderSummaryList>
      <CheckoutOrderSummaryListItem head="item1" tail="price1" />
      <CheckoutOrderSummaryListItem head="item2" tail="price2" />
      <CheckoutOrderSummaryListItem head="item3" tail="price3" />
    </CheckoutOrderSummaryList>
  </CheckoutOrderSummaryLayout>
)
WithList.args = {
  title: "Title",
  subTitle: "Sub Title",
  footer: "Footer",
}
