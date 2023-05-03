import React, { useMemo, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import {
  PRODUCT_METAFIELD_KEY_FEE_HANDLING,
  PRODUCT_METAFIELD_NAMESPACE_FEE,
  PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION,
} from "../../../const"
import { getFormattedDateAt, roundPriceAmount } from "../../../utils"
import CheckoutOrderSummary from "../../components/CheckoutOrderSummary"
import { CheckoutSuccessContext } from "../CheckoutSuccessContext"

import RefreshIcon from "../../../rUI/img/autoship-icon.svg"

const MONTHLY_DELIVERY_DAYS = 15
const DEFAULT_HANDLING_FEE = 14
const MAXIMUM_HANDLING_FEE = 9.99

function calcPriceAmountWithFee(priceAmount, fee, maxFeeAmount) {
  const feeAmount = Math.min(priceAmount * (fee / 100), maxFeeAmount)

  return priceAmount + feeAmount
}

TrialCheckoutOrderSummaryContainer.propTypes = {
  checkout: PropTypes.object,
  isTrial: PropTypes.bool,
  productsMeta: PropTypes.object,
}

function TrialCheckoutOrderSummaryContainer({
  checkout,
  isTrial,
  productsMeta,
  ...props
}) {
  const { setMonthlyTotal } = useContext(CheckoutSuccessContext)

  const { items, total, subscriptionDataString } = useMemo(() => {
    const subscriptionDataString = getFormattedDateAt(
      checkout.createdAt,
      MONTHLY_DELIVERY_DAYS
    )

    const items = checkout.items?.reduce(
      (
        acc,
        {
          productId,
          title,
          quantity,
          price,
          isTrial: isItemTrial,
          isFullPack,
          type,
        }
      ) => {
        if (isItemTrial) {
          return acc
        }

        const itemMeta = productsMeta[productId] ?? {}
        const itemSubscriptions =
          itemMeta[PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION] ?? {}
        const subscriptionDiscount = itemSubscriptions[type]
        const item = {
          label: title,
          quantity,
          order: isFullPack ? 0 : 1,
        }

        const priceWithQuantity = price * quantity

        if (!isFullPack) {
          item.priceV2 = {
            amount: roundPriceAmount(priceWithQuantity),
          }
        } else {
          const itemFee = itemMeta[PRODUCT_METAFIELD_NAMESPACE_FEE] ?? {}
          const itemHandlingFee =
            itemFee[PRODUCT_METAFIELD_KEY_FEE_HANDLING] ?? DEFAULT_HANDLING_FEE

          const priceWithSubscriptionDiscount = subscriptionDiscount
            ? priceWithQuantity * (1 - subscriptionDiscount / 100)
            : priceWithQuantity

          item.priceV2 = {
            amount: roundPriceAmount(
              calcPriceAmountWithFee(
                priceWithSubscriptionDiscount,
                itemHandlingFee,
                MAXIMUM_HANDLING_FEE
              )
            ),
          }

          item.priceV2BeforeDiscount = {
            amount: roundPriceAmount(
              calcPriceAmountWithFee(
                priceWithQuantity,
                itemHandlingFee,
                MAXIMUM_HANDLING_FEE
              )
            ),
          }

          item.coupon = {
            value: subscriptionDiscount,
            type: "percent",
          }
        }

        acc.push(item)
        return acc
      },
      []
    )

    const totalAmount = items.reduce(
      (acc, { priceV2: { amount } }) => acc + amount,
      0
    )

    const shippingAmount =
      process.env.FREE_SHIPPING_AMOUNT / 100 > totalAmount ? 2.99 : 0

    items.push({
      label: "Shipping",
      priceV2: {
        amount: roundPriceAmount(shippingAmount),
      },
      order: 2,
    })

    return {
      subscriptionDataString,
      items: items.sort(({ order: o1 }, { order: o2 }) => o1 - o2),
      total: {
        label: "Monthly Total:",
        priceV2: {
          amount: roundPriceAmount(totalAmount + shippingAmount),
        },
      },
    }
  }, [checkout, productsMeta])

  useEffect(() => {
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
    setMonthlyTotal(USDollar.format(total.priceV2.amount))
  })

  return (
    <CheckoutOrderSummary
      {...props}
      isTrial={isTrial}
      title="Your Monthly Plan"
      isMonthly={true}
      subTitle={`Subscription begins ${subscriptionDataString}`}
      subTitleImg={RefreshIcon}
      items={items}
      total={total}
    />
  )
}

export default TrialCheckoutOrderSummaryContainer
