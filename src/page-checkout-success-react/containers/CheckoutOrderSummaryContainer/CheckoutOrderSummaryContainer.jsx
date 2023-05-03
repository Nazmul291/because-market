import React, { useMemo } from "react"
import PropTypes from "prop-types"
import CheckoutOrderSummary from "../../components/CheckoutOrderSummary"
import { VARIANT_WITH_BOLDED_TOTAL } from "../../components/CheckoutOrderSummary/CheckoutOrderSummary"

import GuaranteeIcon from "../../../rUI/img/get-in-right-guarantee.png"

CheckoutOrderSummaryContainer.propTypes = {
  checkout: PropTypes.object.isRequired,
  isTrial: PropTypes.bool,
}

function CheckoutOrderSummaryContainer({ checkout, isTrial, ...props }) {
  const { items, total } = useMemo(
    () => ({
      items: checkout?.items?.reverse()?.reduce(
        (acc, { title, quantity, amount, isFullPack }) => {
          if (isTrial && isFullPack) {
            return acc
          }

          acc.unshift({
            label: title,
            quantity,
            priceV2: {
              amount: amount,
            },
          })

          return acc
        },
        [
          ...(!checkout.discount
            ? []
            : [
                {
                  label: "Discount",
                  priceV2: {
                    amount: -checkout.discount,
                  },
                },
              ]),
          {
            label: "One Time Shipping Fee",
            isNotBold: true,
            priceV2: {
              amount: checkout?.shipping,
            },
          },
        ]
      ),
      total: {
        label: "Today's Order Total",
        priceV2: {
          amount: checkout?.totalWithTax,
        },
      },
    }),
    [checkout, isTrial]
  )

  return (
    <CheckoutOrderSummary
      {...props}
      variant={VARIANT_WITH_BOLDED_TOTAL}
      title="Order Summary"
      titleImg={GuaranteeIcon}
      isTrial={isTrial}
      isMonthly={false}
      items={items}
      total={total}
    />
  )
}

export default CheckoutOrderSummaryContainer
