/* eslint-disable react/no-multi-comp */
import React from "react"
import CheckoutOrderSummary from "./"
import { VARIANT_WITH_BOLDED_TOTAL } from "./CheckoutOrderSummary"

export default {
  title: "CheckoutSuccess/components/CheckoutOrderSummary",
  component: CheckoutOrderSummary,
}

export const Default = (arg) => (
  <CheckoutOrderSummary isTrial={false} isMonthly={false} {...arg} />
)
Default.args = {
  title: "Title",
  subTitle: "Sub Title",
  items: [
    {
      label: "Item with quantity",
      quantity: 3,
      priceV2: {
        amount: 20,
      },
    },
    {
      label: "Item without quantity",
      priceV2: {
        amount: 20,
      },
    },
    {
      label: "Item without price",
    },
    {
      label: "Item with discount price",
      quantity: 3,
      priceV2: {
        amount: 20,
      },
      priceV2BeforeDiscount: {
        amount: 25,
      },
      coupon: {
        value: 20,
        type: "percent",
      },
    },
  ],
  total: {
    label: "Total label",
    priceV2: {
      amount: 40,
    },
  },
}

export const WithBoldTotal = (arg) => (
  <CheckoutOrderSummary isTrial={false} isMonthly={false} {...arg} />
)

WithBoldTotal.args = {
  title: "Title",
  subTitle: "Sub Title",
  items: [
    {
      label: "Item with quantity",
      quantity: 3,
      priceV2: {
        amount: 20,
      },
    },
    {
      label: "Item without quantity",
      priceV2: {
        amount: 20,
      },
    },
  ],
  total: {
    label: "Total label",
    priceV2: {
      amount: 40,
    },
  },
  variant: VARIANT_WITH_BOLDED_TOTAL,
}
