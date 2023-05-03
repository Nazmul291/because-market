import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { useProductSubscriptions } from "../../../hooks"
import { AccountProductFormPricing } from "../../../rUI"

AccountPDPEditFormSelectedPrice.propTypes = {
  product: PropTypes.object,
  selectedVariant: PropTypes.object,
  quantity: PropTypes.number,
  intervalType: PropTypes.string,
}

function AccountPDPEditFormSelectedPrice({
  product,
  selectedVariant,
  quantity,
  intervalType,
  ...props
}) {
  const { subscriptions } = useProductSubscriptions(product)

  const discounts = useMemo(() => {
    if (!intervalType || !subscriptions) {
      return null
    }

    const subscription = subscriptions?.find(({ key }) => key === intervalType)

    if (!subscription) {
      return null
    }

    return [subscription.value]
  }, [subscriptions, intervalType])

  return (
    <AccountProductFormPricing
      {...props}
      label={intervalType ? "Subscription" : "One-Time Purchase"}
      variant={selectedVariant}
      quantity={quantity}
      discounts={discounts}
    />
  )
}

export default AccountPDPEditFormSelectedPrice
